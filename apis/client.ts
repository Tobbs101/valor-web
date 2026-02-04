/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { SESSION_USER_KEY } from "@/static";
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    // "Cache-Control": "no-cache",
  },
});

client.interceptors.request.use(
  async (config: any) => {
    const user =
      typeof window !== "undefined" && sessionStorage.getItem(SESSION_USER_KEY);

    const session_user = user ? JSON.parse(user) : {};
    const token = session_user?.token;

    if (user) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error),
);

client.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response.status === 401 && error.config.url !== "/") {
      console.error("Unauthenticated, kindly login again...");
    }
    return Promise.reject(error);
  },
);

export default client;
