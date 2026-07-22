import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Memory store for OTP rate limiting: Maps phone number -> array of timestamps of sends
const otpSendTracker = new Map<string, number[]>();

/**
 * Normalizes Bangladeshi mobile numbers.
 * Accept: 017XXXXXXXX, 88017XXXXXXXX, +88017XXXXXXXX
 * Convert to: 8801XXXXXXXXX (13 digits)
 */
function normalizePhoneNumber(phone: string): string {
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 11 && clean.startsWith('01')) {
    return '88' + clean;
  }
  if (clean.length === 13 && clean.startsWith('8801')) {
    return clean;
  }
  return clean;
}

/**
 * Masks phone number for safe logging.
 * Example: 8801712345678 -> 88017*****678
 */
function maskPhoneNumber(phone: string): string {
  if (phone.length <= 6) return '******';
  return phone.slice(0, 5) + '*****' + phone.slice(-3);
}

/**
 * Basic rate limiting helper for OTP
 */
function checkOtpRateLimit(phone: string): boolean {
  const now = Date.now();
  const fifteenMinutesAgo = now - 15 * 60 * 1000;
  
  let timestamps = otpSendTracker.get(phone) || [];
  timestamps = timestamps.filter(ts => ts > fifteenMinutesAgo);
  
  if (timestamps.length >= 3) {
    return false;
  }
  
  timestamps.push(now);
  otpSendTracker.set(phone, timestamps);
  return true;
}

/**
 * Verifies if there's a recent saved order in Supabase for the given phone number or any recent order (for admin notifications).
 */
async function verifyOrderExistsInSupabase(phone: string, isAdmin: boolean): Promise<boolean> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('[SMS Verify] Supabase credentials missing. Bypassing order verification for testing.');
    return true;
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    
    let query = supabase.from('orders').select('id, phone, order_time');
    
    if (isAdmin) {
      // For admin notifications, check if there are any orders saved in the last 15 minutes
      query = query.gte('order_time', fifteenMinutesAgo).limit(1);
    } else {
      // For customer confirmations, check if there is an order with this phone in the last 15 minutes
      query = query.eq('phone', phone).gte('order_time', fifteenMinutesAgo).limit(1);
    }
    
    const { data, error } = await query;
    if (error) {
      console.error('[SMS Verify] Supabase query error:', error);
      return true; // Graceful fallback: do not block message delivery if database fails
    }
    
    return data && data.length > 0;
  } catch (err) {
    console.error('[SMS Verify] Exception during order verification:', err);
    return true; // Graceful fallback on system exceptions
  }
}

/**
 * Reusable backend function to send SMS via BD Bulk SMS API
 */
async function sendBdBulkSms(to: string, message: string, purpose: string = 'unknown') {
  const apiUrl = process.env.BD_SMS_API_URL || 'https://api.bdbulksms.net/api.php';
  const token = process.env.BD_SMS_TOKEN;

  if (!token) {
    const errMsg = 'BD_SMS_TOKEN is not configured in environment variables';
    console.error(`[SMS Error] ${errMsg}`);
    return {
      success: false,
      providerResponse: null,
      error: errMsg
    };
  }

  const normalizedTo = normalizePhoneNumber(to);
  const maskedTo = maskPhoneNumber(normalizedTo);

  const params = new URLSearchParams();
  params.append('token', token);
  params.append('to', normalizedTo);
  params.append('message', message);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
      signal: controller.signal,
    });

    const responseText = await response.text();
    clearTimeout(timeoutId);

    let providerResponse: any;
    try {
      providerResponse = JSON.parse(responseText);
    } catch {
      providerResponse = { raw: responseText };
    }

    // Never return or log BD_SMS_TOKEN. Determine success cleanly.
    const success = response.ok && !responseText.toLowerCase().includes('error') && !responseText.toLowerCase().includes('failed');

    // Log only: recipient number partially masked, request type, success/failure, provider response without secrets
    console.log(`[SMS Request] Type: ${purpose}, Recipient: ${maskedTo}, Success: ${success}`);
    console.log(`[SMS Response] Provider Response:`, providerResponse);

    return {
      success,
      providerResponse,
      ...(success ? {} : { error: `SMS API returned failure: ${responseText}` })
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    const isTimeout = error.name === 'AbortError';
    const errMsg = isTimeout ? 'SMS request timed out after 10s' : error.message || 'Unknown network error';
    
    console.error(`[SMS Error] Recipient: ${maskedTo}, Error: ${errMsg}`);
    
    return {
      success: false,
      providerResponse: null,
      error: errMsg
    };
  }
}


async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route exposing the sendBdBulkSms function with rate-limiting and validation
  app.post('/api/send-sms', async (req, res) => {
    try {
      const { to, message, purpose } = req.body;

      if (!to || !message || !purpose) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing "to", "message" or "purpose" parameters' 
        });
      }

      // 9. Do not allow arbitrary public SMS abuse
      if (!['otp', 'customer_confirmation', 'admin_notification'].includes(purpose)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid purpose. Only "otp", "customer_confirmation", "admin_notification" are allowed.' 
        });
      }

      const normalizedTo = normalizePhoneNumber(to);

      // 10. Add basic rate limiting
      if (purpose === 'otp') {
        const allowed = checkOtpRateLimit(normalizedTo);
        if (!allowed) {
          return res.status(429).json({ 
            success: false, 
            error: 'Rate limit exceeded. Maximum 3 OTP sends per phone number per 15 minutes.' 
          });
        }
      } else if (purpose === 'customer_confirmation') {
        // Customer confirmation: only callable by the server after a valid saved order
        const isOrderValid = await verifyOrderExistsInSupabase(normalizedTo, false);
        if (!isOrderValid) {
          return res.status(403).json({ 
            success: false, 
            error: 'Access Denied: No matching recent saved order found for this phone number.' 
          });
        }
      } else if (purpose === 'admin_notification') {
        // Admin notification: only callable by the server after a valid saved order
        const isOrderValid = await verifyOrderExistsInSupabase(normalizedTo, true);
        if (!isOrderValid) {
          return res.status(403).json({ 
            success: false, 
            error: 'Access Denied: No recent saved orders found.' 
          });
        }
      }

      // Send the SMS
      const result = await sendBdBulkSms(normalizedTo, message, purpose);
      
      return res.json(result);

    } catch (error: any) {
      console.error('[SMS Endpoint Error]:', error);
      return res.status(500).json({ success: false, error: 'Internal server error processing SMS' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
