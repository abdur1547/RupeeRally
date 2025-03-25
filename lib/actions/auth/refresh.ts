"use server";

import api from "@/lib/helpers/axiosInstance";
import { cookies } from "next/headers";
import axios from "axios";
import { ApiResponse } from "@/types";

export const refreshToken = async (): Promise<ApiResponse> => {
  try {
    const accessToken = (await cookies()).get("access_token")?.value;
    const refreshToken = (await cookies()).get("refresh_token")?.value;

    if (!refreshToken || !accessToken) {
      return { success: false, message: "No refresh token found", errors: [], data: null };
    }

    const response = await api.post("/auth/refresh", {
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (!response.data.success) {
      throw new Error("Failed to refresh token");
    }

    const newAccessToken = response.data.data.access_token;

    (await cookies()).set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return { success: true, message: "Token refreshed!", errors: [], data: null };
  } catch (error) {
    console.error("Error refreshing token.", new Date().toLocaleString(), error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          message: "Failed to refresh token",
          errors: error.response.data.errors,
          data: null,
        };
      }
    }
    return {
      success: false,
      message: error as string,
      errors: ["If this error persists, please contact us."],
      data: null,
    };
  }
};
