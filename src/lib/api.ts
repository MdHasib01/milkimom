import { API_ENDPOINTS } from '../config/api';

export interface OrderDetails {
  product: string;
  customerName: string;
  phone: string;
  alternativePhone?: string;
  district: string;
  thana: string;
  address: string;
  flavour?: string;
  paymentMethod: string;
  price: number;
  transactionId?: string;
  screenshotUploaded?: boolean;
  pageUrl?: string;
  orderTime?: string;
}

export interface ApiResult<T = any> {
  success: boolean;
  data?: T;
  error?: any;
}

async function request<T = any>(url: string, options?: RequestInit): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    const json = await response.json();
    return json;
  } catch (err: any) {
    console.error(`API request failed: ${url}`, err);
    return { success: false, error: err?.message || 'Network error' };
  }
}

/**
 * Saves an order to the backend (MongoDB).
 */
export async function saveOrder(orderDetails: OrderDetails): Promise<ApiResult> {
  return request(API_ENDPOINTS.orders, {
    method: 'POST',
    body: JSON.stringify(orderDetails),
  });
}

/**
 * Fetches orders from the backend with optional filters.
 */
export async function getOrders(params?: {
  status?: string;
  phone?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResult> {
  const query = new URLSearchParams();
  if (params?.status) query.set('status', params.status);
  if (params?.phone) query.set('phone', params.phone);
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  const qs = query.toString();
  return request(`${API_ENDPOINTS.orders}${qs ? `?${qs}` : ''}`);
}

/**
 * Fetches a single order by id.
 */
export async function getOrderById(id: string): Promise<ApiResult> {
  return request(API_ENDPOINTS.orderById(id));
}

/**
 * Updates the status of an order.
 */
export async function updateOrderStatus(id: string, status: string): Promise<ApiResult> {
  return request(API_ENDPOINTS.orderStatus(id), {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

/**
 * Sends an SMS through the backend.
 * purpose: 'otp' | 'customer_confirmation' | 'admin_notification'
 */
export async function sendSms(
  to: string,
  message: string,
  purpose: 'otp' | 'customer_confirmation' | 'admin_notification'
): Promise<ApiResult> {
  return request(API_ENDPOINTS.sendSms, {
    method: 'POST',
    body: JSON.stringify({ to, message, purpose }),
  });
}
