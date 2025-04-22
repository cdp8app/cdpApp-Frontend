import api from "../api";

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName?: string
  lastName?: string
  // Add other fields as needed
}

export interface UserProfile {
  id: string
  email: string
  firstName?: string
  lastName?: string
  // Add other fields as needed
}

const userService = {
  // Student authentication
  loginStudent: async (credentials: LoginCredentials) => {
    const response = await api.post("/api/user/student/login/", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", "student");
    }
    return response.data;
  },

  registerStudent: async (data: RegisterData) => {
    const response = await api.post("/api/user/student/register/", data);
    return response.data;
  },

  // Company authentication
  loginCompany: async (credentials: LoginCredentials) => {
    const response = await api.post("/api/user/company/login/", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", "company");
    }
    return response.data;
  },

  registerCompany: async (data: RegisterData) => {
    const response = await api.post("/api/user/company/register/", data);
    return response.data;
  },

  async activateAccount(code: string) {
    const response = await api.put("/api/user/activate/", code);
    return response.data;
  },

  // Profile management
  getStudentProfile: async () => {
    const response = await api.get("/api/user/student/profile/");
    return response.data;
  },

  updateStudentProfile: async (data: Partial<UserProfile>) => {
    const response = await api.put("/api/user/student/profile/", data);
    return response.data;
  },

  // Password reset
  requestPasswordReset: async (email: string) => {
    const response = await api.post("/api/user/password-reset/", { email });
    return response.data;
  },

  verifyResetToken: async (token: string) => {
    const response = await api.post("/api/user/password-reset/verify/", { token });
    return response.data;
  },

  resetPassword: async (token: string, password: string) => {
    const response = await api.post("/api/user/password-reset/confirm/", { token, password });
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
  },
};

export default userService;
