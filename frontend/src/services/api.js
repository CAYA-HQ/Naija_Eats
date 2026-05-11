const API_BASE_URL = "https://naija-eats-api-demo.herokuapp.com/api"; // Demo base URL. Replace with real URL later.

export const authService = {
  async signIn(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to sign in");
    }
    
    // Store token if available
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    
    return data;
  },

  async signUp(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to sign up");
    }
    
    return data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};
