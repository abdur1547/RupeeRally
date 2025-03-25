"use server";

import { cookies } from "next/headers";

export const logoutUser = async (): Promise<{ success: true }> => {
  (await cookies()).delete("access_token");
  (await cookies()).delete("refresh_token");
  return { success: true };
};

export const isUserLoggedIn = async (): Promise<boolean> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  return !!accessToken; // Returns true if the token exists, otherwise false
};
