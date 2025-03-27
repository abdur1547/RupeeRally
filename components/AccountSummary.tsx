import React from "react";
import { Wallet } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface CardProps extends VariantProps<typeof cardVariants> {
  label: string;
  amount: string;
  className?: string;
  svgColor?: string;
}

const cardVariants = cva("flex flex-col items-start gap-3 shadow-sm rounded-xl p-5 pr-10", {
  variants: {
    variant: {
      default: cn(
        "bg-white",
        "[&_span]:bg-muted",
        "[&_p]:text-foreground",
        "[&_h5]:text-secondary"
      ),
      special: cn(
        "bg-primary [&_span]:bg-white/14",
        "[&_p]:text-background",
        "[&_h5]:text-[#DCDCDC]"
      ),
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const Card = ({ variant, label, amount, className, svgColor = "text-white" }: CardProps) => {
  return (
    <div data-slot="card" className={cn(cardVariants({ variant, className }))}>
      <span className="rounded-full p-1.5">
        <Wallet size={20} className={svgColor} />
      </span>
      <div data-slot="card-content">
        <h5 className="text-base font-normal">{label}</h5>
        <p className="text-xl font-bold">{amount}</p>
      </div>
    </div>
  );
};

export const AccountSummary = () => {
  return (
    <section>
      <div className="grid grid-cols-6 gap-7">
        <Card variant="special" label="All Accounts" amount="$ 1400" />
        <Card variant="default" label="Total Income" amount="$ 12.00" svgColor="text-income" />
        <Card variant="default" label="Total Spent" amount="$ 4.00" svgColor="text-destructive" />
      </div>
    </section>
  );
};

export const FinanceSummary = () => {
  return (
    <section>
      <div className="grid grid-cols-6 gap-7">
        <Card variant="special" label="Balance" amount="$ 1400" />
        <Card variant="default" label="Income" amount="$ 21.30" svgColor="text-income" />
        <Card variant="default" label="Savings" amount="$ 1500.89" svgColor="text-primary" />
        <Card variant="default" label="Expenses" amount="$ 19.123" svgColor="text-destructive" />
      </div>
    </section>
  );
};
