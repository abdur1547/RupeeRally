import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes, useId } from "react";

interface IconInputProps extends React.ComponentProps<"input"> {
  Icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const IconInput = ({ Icon, ...inputProps }: IconInputProps) => {
  const id = useId();
  return (
    <div className="relative">
      <Input
        id={id}
        className={cn({
          "ps-9": Icon,
        })}
        {...inputProps}
      />
      {Icon && (
        <div className="text-input pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <Icon size={18} aria-hidden="true" />
        </div>
      )}
    </div>
  );
};
