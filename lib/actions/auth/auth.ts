"use server";

import api from "@/lib/actions/auth/axiosInstance";
import { cookies } from "next/headers";

/**
 * Logs in the user by sending credentials to the server.
 * Stores access and refresh tokens in HTTP-only cookies.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<{ success: boolean; message?: string }>} - Returns success status and optional error message.
 */
export async function loginUser(email: string, password: string) {
  try {
    const response = await api.post("/auth/signin", { email, password });

    if (!response.data.success) {
      throw new Error("Invalid credentials");
    }

    const { access_token, refresh_token } = response.data.data;

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

    return { success: true, message: "Login successful!" };
  } catch (error) {
    return { success: false, message: "Login failed" };
  }
}

/**
 * Logs out the user by deleting authentication cookies.
 * @returns {Promise<{ success: boolean }>} - Returns success status.
 */
export async function logoutUser() {
  (await cookies()).delete("access_token");
  (await cookies()).delete("refresh_token");
  return { success: true };
}

/**
 * Checks if the user is logged in based on the presence of an access token in cookies.
 * @returns {boolean} - Returns `true` if logged in, `false` otherwise.
 */
export async function isUserLoggedIn(): Promise<boolean> {
  const accessToken = (await cookies()).get("access_token")?.value;
  return !!accessToken; // Returns true if the token exists, otherwise false
}
