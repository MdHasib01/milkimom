import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase() {
  if (!supabaseInstance) {
    const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    
    if (supabaseUrl && supabaseKey) {
      supabaseInstance = createClient(supabaseUrl, supabaseKey);
    } else {
      console.warn('Supabase credentials are missing. Please provide SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.');
    }
  }
  return supabaseInstance;
}

export async function saveOrderToSupabase(orderDetails: any) {
  try {
    const client = getSupabase();
    if (!client) {
      console.log('Mock: Order would be saved to Supabase:', orderDetails);
      return { success: true, mock: true };
    }

    const insertData: any = {
      product: orderDetails.product,
      customer_name: orderDetails.customerName,
      phone: orderDetails.phone,
      district: orderDetails.district,
      thana: orderDetails.thana,
      address: orderDetails.address,
      payment_method: orderDetails.paymentMethod,
      payment_status: orderDetails.paymentMethod === 'Cash on Delivery' || orderDetails.paymentMethod === 'COD' ? 'COD' : 'Paid',
      price: orderDetails.price,
      page_url: orderDetails.pageUrl,
      order_time: orderDetails.orderTime,
      status: 'Pending'
    };

    if (orderDetails.alternativePhone) insertData.alternative_phone = orderDetails.alternativePhone;
    if (orderDetails.flavour) insertData.flavour = orderDetails.flavour;
    if (orderDetails.transactionId) insertData.transaction_id = orderDetails.transactionId;
    if (orderDetails.screenshotUploaded !== undefined) insertData.screenshot_uploaded = orderDetails.screenshotUploaded;

    console.log('Attempting to insert into Supabase:', insertData);

    const response = await client
      .from('orders')
      .insert([insertData])
      .select();

    console.log('Supabase Response:', response);
    console.log('Supabase Data:', response.data);
    console.log('Supabase Error:', response.error);

    if (response.error) {
      console.error('Error saving order to Supabase:', response.error);
      const error = response.error;
      
      // Fallback: If it failed due to some columns not existing, try a minimal insert
      if (error.code === 'PGRST204' || error.message?.includes('does not exist')) {
        console.log('Attempting minimal fallback insert...');
        const minimalData = {
          customer_name: orderDetails.customerName,
          phone: orderDetails.phone,
          district: orderDetails.district,
          thana: orderDetails.thana,
          address: orderDetails.address,
          payment_method: orderDetails.paymentMethod,
          payment_status: orderDetails.paymentMethod === 'Cash on Delivery' || orderDetails.paymentMethod === 'COD' ? 'COD' : 'Paid',
          status: 'Pending',
          price: orderDetails.price
        };
        const fallbackResponse = await client.from('orders').insert([minimalData]).select();
        
        console.log('Fallback Supabase Response:', fallbackResponse);
        
        if (fallbackResponse.error) {
          return { success: false, error: fallbackResponse.error };
        }
        return { success: true, data: fallbackResponse.data };
      }
      
      return { success: false, error };
    }

    console.log('Order saved to Supabase successfully:', response.data);
    return { success: true, data: response.data };
  } catch (err) {
    console.error('Exception saving order:', err);
    return { success: false, error: err };
  }
}
