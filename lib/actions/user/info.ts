"use server";

import api from "@/lib/helpers/axiosInstance";

export const getUserInfo = async () => {
  try {
    const { data } = await api.get("/user_info");
    console.log("info");

    console.log(data);
    return data;
  } catch {}
};
