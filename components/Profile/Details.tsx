"use client";

import React from "react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const Details = () => {
  return (
    <section>
      <div>
        <h4 className="text-lg font-semibold">Personal details</h4>
        <Separator />
        <div>
          <Label>Full Name</Label>
          <Input value="Keith Kennedy" type="text" />
        </div>
        <div>
          <Label>Full Name</Label>
          <Input value="Keith Kennedy" type="text" />
        </div>
        <div>
          <Label>Full Name</Label>
          <Input value="Keith Kennedy" type="text" />
        </div>
      </div>
    </section>
  );
};
