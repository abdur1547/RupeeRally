import React from "react";
import { LogoutForm } from "@/components/AuthGroup/LogoutForm";
import { IconSwapButton } from "@/components/IconSwapButton";
import { Details } from "@/components/Profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import {
  CircleHelp,
  Download,
  FolderSync,
  LucideProps,
  MessagesSquare,
  Settings,
  Trash2,
  User,
} from "lucide-react";

const managementActions: {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  variant: "default" | "destructive";
}[] = [
  { Icon: Download, label: "Export records", variant: "default" },
  { Icon: FolderSync, label: "Backup & Restore", variant: "default" },
  { Icon: Trash2, label: "Delete & Restore", variant: "destructive" },
];

const accountActions = [
  { Icon: CircleHelp, label: "Help" },
  { Icon: MessagesSquare, label: "Feedback" },
];

const Account = async () => {
  return (
    <div className="flex gap-4">
      <section className="bg-white p-6 rounded-xl flex flex-col gap-4 w-xs">
        <div className="flex items-center gap-7">
          <Avatar className="size-[72px]">
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback className="bg-transparent border border-secondary">
              <User size={48} aria-hidden="true" className="text-secondary" />
            </AvatarFallback>
          </Avatar>
          <h4 className="text-lg font-semibold">Keith Kennedy</h4>
        </div>

        <IconSwapButton Icon={Settings}>Preferences</IconSwapButton>

        <Separator />

        {/* Management section */}
        <h6 className="text-base font-normal">Management</h6>
        {managementActions.map(({ Icon, label, variant }, index) => (
          <IconSwapButton key={index} Icon={Icon} variant={variant}>
            {label}
          </IconSwapButton>
        ))}

        <Separator />

        {/* Account section */}
        <h6 className="text-base font-normal">Management</h6>
        {accountActions.map(({ Icon, label }, index) => (
          <IconSwapButton key={index} Icon={Icon}>
            {label}
          </IconSwapButton>
        ))}

        <Separator />
        <LogoutForm />
      </section>

      <Details />
    </div>
  );
};

export default Account;
