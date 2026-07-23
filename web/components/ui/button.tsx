import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 text-base font-bold transition-[transform,box-shadow,background-color] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 disabled:pointer-events-none disabled:opacity-55 active:scale-[.98]",
  {
    variants: {
      variant: {
        primary: "bg-emerald-950 text-white shadow-[0_14px_30px_-14px_rgba(2,44,34,.75)] hover:bg-emerald-900 hover:shadow-[0_16px_36px_-14px_rgba(2,44,34,.9)]",
        ghost: "bg-white/70 text-emerald-950 ring-1 ring-emerald-950/10 hover:bg-white",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return <Component className={cn(buttonVariants({ variant }), className)} {...props} />;
}
