import { LogoutForm } from "@/components/AuthGroup/LogoutForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CircleHelp,
  Download,
  FolderSync,
  MessagesSquare,
  Settings,
  Trash2,
  User,
} from "lucide-react";
import React from "react";

const Account = () => {
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
        <Button variant="ghost" className="group gap-4">
          <Settings
            size={24}
            aria-hidden="true"
            className="size-9 p-1.5 bg-muted rounded-md group-hover:bg-transparent"
          />
          Preferences
        </Button>
        <Separator />
        <h6 className="text-base font-normal">Management</h6>
        <Button variant="ghost" className="group gap-4">
          <Download
            size={24}
            aria-hidden="true"
            className="size-9 p-1.5 bg-muted rounded-md group-hover:bg-transparent"
          />
          Export records
        </Button>
        <Button variant="ghost" className="group gap-4">
          <FolderSync
            size={24}
            aria-hidden="true"
            className="size-9 p-1.5 bg-muted rounded-md group-hover:bg-transparent"
          />
          Backup & Restore
        </Button>
        <Button variant="ghost" className="group gap-4">
          <Trash2
            size={24}
            aria-hidden="true"
            className="size-9 p-1.5 bg-muted rounded-md group-hover:bg-transparent"
          />
          Delete & Restore
        </Button>
        <Separator />
        <Button variant="ghost" className="group gap-4">
          <CircleHelp
            size={24}
            aria-hidden="true"
            className="size-9 p-1.5 bg-muted rounded-md group-hover:bg-transparent"
          />
          Help
        </Button>
        <Button variant="ghost" className="group gap-4">
          <MessagesSquare
            size={24}
            aria-hidden="true"
            className="size-9 p-1.5 bg-muted rounded-md group-hover:bg-transparent"
          />
          Feedback
        </Button>
        <Separator />
        <Button variant="ghost" asChild>
          <LogoutForm iconSize="lg" />
        </Button>
      </section>
      <section></section>
    </div>
  );
};

export default Account;
