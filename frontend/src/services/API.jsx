import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:8000";

/* Axios instance */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* Request interceptor (JWT ready) */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      //  config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* Response interceptor */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    return Promise.reject({ message, status: error.response?.status });
  }
);
/* ================= LOGIN API ==================== */
export const loginApi ={
  getLogin: async(payload) => {
    const {data} = await api.post("/api/token/", payload)
    return data;
  }
}
/* ================= EMPLOYEE API ================= */

export const employeeApi = {

  getAll: async () => {
    const { data } = await api.get("/api/employees/");
    return data;
  },

  create: async (payload) => {
    const { data } = await api.post("/api/employees/", payload);
    return data;
  },

  delete: async (id) => {
    return api.delete(`/api/employees/${id}/`);
  },

  getDepartments: async () => {
    const { data } = await api.get("/api/employees/departments/");
    return data;
  },
};

/* ================= ATTENDANCE API ================= */

export const attendanceApi = {
  markAttendance: async (payload) => {
    const { data } = await api.post("/api/attendance/", payload);
    return data;
  },

  getByEmployee: async (employeeId) => {
    const { data } = await api.get(`/api/attendance/${employeeId}/`);
    return data;
  },

  getAll: async (date = null) => {
    const params = date ? { date } : {};
    const { data } = await api.get("/api/attendance/", { params });
    return data;
  },
};

export default api;
