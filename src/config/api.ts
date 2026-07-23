/**
 * Backend API configuration.
 * Override the base URL with VITE_API_BASE_URL in .env for production.
 */
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/api/health`,
  orders: `${API_BASE_URL}/api/orders`,
  orderById: (id: string) => `${API_BASE_URL}/api/orders/${id}`,
  orderStatus: (id: string) => `${API_BASE_URL}/api/orders/${id}/status`,
  sendSms: `${API_BASE_URL}/api/sms/send`,
} as const;
