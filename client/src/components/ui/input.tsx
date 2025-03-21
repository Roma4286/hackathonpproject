import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div className={cn("relative p-0.5", className)}>
      <span className="absolute inset-0 pointer-events-none bg-black pixel-corners-sm"></span>
      <input
        type={type}
        data-slot="input"
        className={cn(
          "mb-1 pixel-corners-sm bg-white file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-none flex h-9 w-full min-w-0 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
