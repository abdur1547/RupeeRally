"use server";

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.API_BASE_URL || "";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach Authorization token dynamically
api.interceptors.request.use(async (config) => {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return config;
});

export default api;
