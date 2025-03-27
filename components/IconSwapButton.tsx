import React from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

interface IconSwapButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  size?: "sm" | "default";
  variant?: "default" | "destructive";
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

interface IconSwapLinkProps extends LinkProps {
  children: React.ReactNode;
  size?: "sm" | "default";
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
}

export const IconSwapButton: React.FC<IconSwapButtonProps> = ({
  children,
  Icon,
  className,
  variant,
  size = "default",
  ...props
}) => {
  return (
    <button
      className={cn(
        "group flex items-center justify-start font-normal text-secondary w-full",
        "data-[variant=destructive]:text-destructive",
        {
          "text-base gap-4": size === "default",
          "text-sm gap-2": size === "sm",
        },
        className
      )}
      data-variant={variant}
      {...props}
    >
      <span
        className={cn("bg-muted overflow-hidden relative", {
          "size-9 p-1.5 rounded-md": size === "default",
          "size-7 p-1 rounded-sm": size === "sm",
        })}
      >
        <Icon
          size={size === "default" ? 24 : 16}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:-translate-x-32"
          aria-hidden="true"
        />
        <Icon
          size={size === "default" ? 24 : 16}
          className="absolute top-1/2 left-1/2 transform translate-x-32 -translate-y-1/2 transition-all duration-300 group-hover:-translate-x-1/2"
          aria-hidden="true"
        />
      </span>
      {children}
    </button>
  );
};

export const IconSwapLink: React.FC<IconSwapLinkProps> = ({
  children,
  Icon,
  className,
  size = "default",
  ...props
}) => {
  return (
    <Link
      className={cn(
        "group flex items-center justify-start font-normal text-secondary w-full cursor-pointer",
        {
          "text-base gap-4": size === "default",
          "text-sm gap-2": size === "sm",
        },
        className
      )}
      {...props}
    >
      <span
        className={cn("bg-muted overflow-hidden relative", {
          "size-9 p-1.5 rounded-md": size === "default",
          "size-7 p-1 rounded-sm": size === "sm",
        })}
      >
        <Icon
          size={size === "default" ? 24 : 16}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:-translate-x-32"
          aria-hidden="true"
        />
        <Icon
          size={size === "default" ? 24 : 16}
          className="absolute top-1/2 left-1/2 transform translate-x-32 -translate-y-1/2 transition-all duration-300 group-hover:-translate-x-1/2"
          aria-hidden="true"
        />
      </span>
      {children}
    </Link>
  );
};
