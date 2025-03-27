import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDownIcon, Headset, User, UserPenIcon } from "lucide-react";
import { LogoutForm } from "./AuthGroup/LogoutForm";
import { IconSwapButton, IconSwapLink } from "./IconSwapButton";

export const ProfileDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent cursor-pointer">
          <Avatar className="size-8">
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback className="bg-transparent border border-secondary">
              <User />
            </AvatarFallback>
          </Avatar>
          <h4 className="text-secondary text-base">Keith</h4>
          <ChevronDownIcon size={14} className="text-secondary" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 border-none p-2 space-y-2">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">Keith Kennedy</span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            k.kennedy@originui.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <IconSwapLink size="sm" href="/profile" Icon={UserPenIcon}>
              Profile
            </IconSwapLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <IconSwapButton size="sm" Icon={Headset}>
              Support
            </IconSwapButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="group text-secondary">
          <LogoutForm size="sm" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
