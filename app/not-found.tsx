import { isUserLoggedIn } from "@/lib/actions/auth/logout";
import { redirect } from "next/navigation";

const NotFound = async () => {
  if (await isUserLoggedIn()) {
    redirect("/dashboard");
  }

  redirect("/login");
};

export default NotFound;
