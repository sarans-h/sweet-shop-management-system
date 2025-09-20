export const API_BASE_URL = "http://localhost:8080";
export const API_PATHS = {
  sweets: `${API_BASE_URL}/api/sweets`,
  sweet: (id: string) => `${API_BASE_URL}/api/sweets/${id}`,
  sweetPurchase: (id: string) => `${API_BASE_URL}/api/sweets/${id}/purchase`,
  authLogin: `${API_BASE_URL}/api/auth/login`,
  authRegister: `${API_BASE_URL}/api/auth/register`,
};
