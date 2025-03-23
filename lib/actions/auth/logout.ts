"use server";

import { cookies } from "next/headers";

export async function logoutUser() {
  (await cookies()).delete("access_token");
  (await cookies()).delete("refresh_token");
  return { success: true };
}

export async function isUserLoggedIn(): Promise<boolean> {
  const accessToken = (await cookies()).get("access_token")?.value;
  return !!accessToken; // Returns true if the token exists, otherwise false
}
