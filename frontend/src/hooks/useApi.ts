import { useAuth } from '../context/AuthContext';

export const useApi = () => {
  const { token, logout } = useAuth();

  const secureRequest = async (endpoint: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers || {});
    
    // Inject Bearer access tokens automatically into outbound headers
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(endpoint, config);
      
      // If the token expires (401), execute an immediate safety logout procedure
      if (response.status === 401) {
        logout();
        throw new Error('Session validation expired. Re-authentication mandatory.');
      }
      
      return response;
    } catch (error) {
      console.error('Secure communication interception trace:', error);
      throw error;
    }
  };

  return { secureRequest };
};