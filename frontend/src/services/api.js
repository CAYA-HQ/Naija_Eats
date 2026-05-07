// const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
// const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';


// const request = async (endpoint, options = {}) => {
//   if (USE_MOCKS) {
//     return mockResponse(endpoint, options);
//   }

//   const token = localStorage.getItem('token');
//   const headers = {
//     'Content-Type': 'application/json',
//     ...options.headers,
//   };

//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   try {
//     const response = await fetch(`${BASE_URL}${endpoint}`, {
//       ...options,
//       headers,
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || 'API Error');
//     return data;
//   } catch (error) {
//     console.error(`API Error [${endpoint}]:`, error);
//     throw error;
//   }
// };


// const mockResponse = async (endpoint, options) => {
//   await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay

//   if (endpoint === '/auth/register' || endpoint === '/auth/login') {
//     return {
//       success: true,
//       message: 'Success (Mocked)',
//       data: { token: 'mock-jwt-token', user: { id: '123', email: 'user@example.com' } }
//     };
//   }

//   if (endpoint === '/meals') {
//     return {
//       success: true,
//       message: 'Meals retrieved (Mocked)',
//       data: [
//         { id: 1, name: 'Jollof Rice', description: 'Classic Nigerian Jollof', price: 2500 },
//         { id: 2, name: 'Pounded Yam & Egusi', description: 'Traditional favorite', price: 3500 }
//       ]
//     };
//   }

//   // Fallback for other endpoints
//   return { success: true, message: 'Mocked Response', data: {} };
// };

// export const authService = {
//   register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
//   login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
// };

// export const mealService = {
//   getMeals: () => request('/meals'),
//   savePreference: (pref) => request('/preference', { method: 'POST', body: JSON.stringify(pref) }),
//   generatePlan: (data) => request('/meals-plan/generate', { method: 'POST', body: JSON.stringify(data) }),
//   getIngredients: (planId) => request(`/ingredients/${planId}`),
// };
