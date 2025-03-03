import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/actions/auth/auth";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={logoutUser}>Logout</Button>
    </div>
  );
};

export default Dashboard;
