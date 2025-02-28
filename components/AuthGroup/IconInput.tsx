import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes, useId } from "react";

interface IconInputProps extends React.ComponentProps<"input"> {
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export default function IconInput({ Icon, placeholder, ...inputProps }: IconInputProps) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id} className="hidden">
        {placeholder}
      </Label>
      <div className="relative">
        <Input id={id} className="ps-9 rounded-full" {...inputProps} placeholder={placeholder} />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <Icon size={16} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
