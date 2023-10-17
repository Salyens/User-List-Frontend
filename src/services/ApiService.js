import axios from "axios";

class ApiService {
  static apiBase = process.env.REACT_APP_API_BASE;

  static async registration(userData) {
    const response = await axios.post(
      `${ApiService.apiBase}/registration`,
      userData
    );
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
  }

  static async get() {
    const data = await axios.get(ApiService.apiBase, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return data;
  }

  static async getUserInfo() {
    const data = await axios.get(`${ApiService.apiBase}/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return data;
  }

  static async delete(ids) {
    await axios.delete(`${ApiService.apiBase}/delete`, {
      data: { idsToDelete: ids },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  static async update(blockStatus, ids) {
    await axios.patch(
      `${ApiService.apiBase}/update`,
      { blockStatus, ids },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  }

  static async login(data) {
    const response = await axios.post(`${ApiService.apiBase}/login`, data);
    localStorage.setItem("token", response.data.accessToken);
    return response.status;
  }
}

export default ApiService;
