import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  color: "blue" | "red" | "green" | "purple";
};

const colorMap = {
  blue: {
    bg: "bg-[#0066cc]",
    border: "border-[#003399]",
    shadow: "shadow-[#002266]",
    hover: "hover:bg-[#0077dd]",
    text: "text-white",
  },
  red: {
    bg: "bg-[#cc0000]",
    border: "border-[#990000]",
    shadow: "shadow-[#660000]",
    hover: "hover:bg-[#dd0000]",
    text: "text-white",
  },
  green: {
    bg: "bg-[#00cc00]",
    border: "border-[#009900]",
    shadow: "shadow-[#006600]",
    hover: "hover:bg-[#00dd00]",
    text: "text-white",
  },
  purple: {
    bg: "bg-[#9900cc]",
    border: "border-[#660099]",
    shadow: "shadow-[#440066]",
    hover: "hover:bg-[#aa00dd]",
    text: "text-white",
  },
};

export default function PixelatedButton({ color, className, children }: Props) {
  const colors = colorMap[color];

  return (
    <button
      className={cn(
        "font-pixelated",

        "relative text-center transition-transform pixelated",
        "border-2 px-3 py-1 min-w-[120px] text-sm uppercase",

        colors.bg,
        colors.border,
        colors.text,

        "before:absolute before:inset-0 before:border-r-2 before:border-b-2 before:border-black/30",
        "after:absolute after:inset-0 after:border-l-2 after:border-t-2 after:border-white/30",

        "shadow-[6px_6px_0px_0px]",
        colors.shadow,

        "active:translate-y-[2px] active:translate-x-[2px] active:shadow-none",
        colors.hover,

        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
