// lib/services/userService.ts

import { clientFetch, getAuthHeader } from "../api";

export const userService = {
  // Auth
  async login(email: string, password: string) {
    return clientFetch("/api/user/login/", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
  },

  async register(userData: any) {
    return clientFetch("/api/user/register/", {
      method: "POST",
      body: JSON.stringify(userData)
    });
  },

  async activateAccount(code: string) {
    return clientFetch("/api/user/activate/", {
      method: "PUT",
      body: JSON.stringify({ code })
    });
  },

  async getCurrentUser() {
    return clientFetch("/api/user/me/", {
      headers: getAuthHeader()
    });
  },

  async updateProfile(profileData: any) {
    return clientFetch("/api/user/profile/update/", {
      method: "PATCH",
      headers: getAuthHeader(),
      body: JSON.stringify(profileData)
    });
  },

  async logout() {
    return clientFetch("/api/user/logout/", {
      method: "POST",
      headers: getAuthHeader()
    });
  }
};
