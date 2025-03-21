"use client";

import { User } from "@/api/types/responses";
import { useUserQuery } from "@/hooks/useUserQuery";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type WorldCondition = User["general_condition"];

type BackgroundProps = ComponentProps<"div"> & {
  condition?: WorldCondition;
};

const imageMap: Record<WorldCondition, string> = {
  Bad: "/bad-background.png",
  Normal: "/normal-background.png",
  Excellent: "/excellent-background.png",
};

export default function Background({
  children,
  className,
  style,
  condition,
  ...props
}: BackgroundProps) {
  if (!condition) {
    return null;
  }

  const imageUrl = imageMap[condition];

  return (
    <div>
      <div
        className={cn(`fixed -z-100 inset-0`, className)}
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "darken",
          filter: "brightness(0.4)",
          ...style,
        }}
        {...props}
      />
      {children}
    </div>
  );
}
