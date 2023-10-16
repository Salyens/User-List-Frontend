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

  static async delete(ids) {

    const response = await axios.delete(`${ApiService.apiBase}/delete`, {
      data: { idsToDelete: ids },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (ids.includes(response.data._id)) localStorage.clear();
  }

  static async update(blockStatus, ids) {

    const response = await axios.patch(
      `${ApiService.apiBase}/update`,
      { blockStatus, ids },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (blockStatus && ids.includes(response.data._id)) localStorage.clear();
  }

  static async login(data) {
    const response = await axios.post(`${ApiService.apiBase}/login`, data);
    localStorage.setItem("token", response.data.accessToken);
    return response.status;
  }
}

export default ApiService;
