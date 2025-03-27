"use client";

import React from "react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FilePenLine } from "lucide-react";

export const Details = () => {
  return (
    <section className="bg-white p-6 rounded-xl w-lg">
      <div className="flex flex-col gap-4 h-full">
        <h4 className="text-lg font-semibold">Personal details</h4>
        <Separator className="mb-2" />
        <div className="space-y-3">
          <Label>Full Name</Label>
          <Input defaultValue="Keith Kennedy" disabled type="text" />
        </div>
        <div className="space-y-3">
          <Label>Email Address</Label>
          <Input defaultValue="k.kennedy@originui.com" disabled type="email" />
        </div>
        <Button className="ml-auto mt-auto">
          <FilePenLine size={22} /> Edit
        </Button>
      </div>
    </section>
  );
};
