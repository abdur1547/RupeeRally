"use server";

import api from "@/lib/helpers/axiosInstance";
import { cookies } from "next/headers";
import axios from "axios";
import { ApiResponse } from "@/types";

export const signupUser = async ({
  fullname,
  email,
  password,
}: {
  fullname: string;
  email: string;
  password: string;
}): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>("/auth/signup", {
      name: fullname,
      email: email,
      password: password,
    });

    const { data } = response;

    if (!data.success) {
      throw new Error("Something went wrong");
    }

    const { access_token, refresh_token } = data.data;

    // Store tokens in cookies
    (await cookies()).set("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    (await cookies()).set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return { success: true, message: "Login successful!", errors: [], data: null };
  } catch (error) {
    console.error("Error signing up user.", new Date().toLocaleString(), error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          message: "Login failed",
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
