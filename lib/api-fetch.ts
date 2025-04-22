// Alternative API client using native fetch
const apiFetch = {
  get: async (url: string, options = {}) => {
    const response = await fetch(`https://careerxhub.onrender.com${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...getAuthHeader(),
      } as HeadersInit,
      ...options,
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  },
  
  post: async (url: string, data: any, options = {}) => {
    const response = await fetch(`https://careerxhub.onrender.com${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...getAuthHeader(),
      } as HeadersInit,
      body: JSON.stringify(data),
      ...options,
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  },
  
  // Add other methods as needed (put, delete, etc.)
};
  
function getAuthHeader() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
  
export default apiFetch;
  