import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonVariants = cva(
  "font-pixelated select-none relative text-center transition-transform border-2 px-3 py-1 min-w-[120px] text-sm uppercase before:absolute before:inset-0 before:border-r-2 before:border-b-2 before:border-black/30 after:absolute after:inset-0 after:border-l-2 after:border-t-2 after:border-white/30 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none shadow-[6px_6px_0px_0px]",
  {
    variants: {
      variant: {
        default:
          "bg-[#0066cc] border-[#003399] shadow-[#002266] hover:bg-[#0077dd] text-white",
        destructive:
          "bg-[#cc0000] border-[#990000] shadow-[#660000] hover:bg-[#dd0000] text-white",
        success:
          "bg-[#00cc00] border-[#009900] shadow-[#006600] hover:bg-[#00dd00] text-white",
        secondary:
          "bg-[#9900cc] border-[#660099] shadow-[#440066] hover:bg-[#aa00dd] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type Props = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export default function Button({
  variant,
  className,
  children,
  asChild,
  ...props
}: Props) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
}
