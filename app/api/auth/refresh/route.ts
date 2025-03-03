import { NextResponse } from "next/server";
import api from "@/lib/actions/auth/axiosInstance";
import { cookies } from "next/headers";

/**
 * API route to refresh the user's access token using the stored refresh token.
 */
export async function GET() {
  try {
    const accessToken = (await cookies()).get("access_token")?.value;
    const refreshToken = (await cookies()).get("refresh_token")?.value;

    if (!refreshToken || !accessToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token found" },
        { status: 401 }
      );
    }

    const response = await api.post("/auth/refresh", {
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (!response.data.success) {
      return NextResponse.json(
        { success: false, message: "Failed to refresh token" },
        { status: 401 }
      );
    }

    const newAccessToken = response.data.data.access_token;

    (await cookies()).set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
