import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useId } from "react";

export default function IconInput() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id} className="hidden">
        Email Address
      </Label>
      <div className="relative">
        <Input id={id} className="ps-9 rounded-full" placeholder="Email Address" type="email" />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <Mail size={16} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
