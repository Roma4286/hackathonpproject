"use client";
import { User } from "@/api/types/auth.dto";
import { useUserQuery } from "@/hooks/useUserQuery";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type BackgroundProps = ComponentProps<"div">;

const imageMap: Record<User["general_condition"], string> = {
  Bad: "bad-background.png",
  Normal: "normal-background.png",
  Excellent: "excellent-background.png",
};

export default function Background({
  children,
  className,
  style,
  ...props
}: BackgroundProps) {
  const { user } = useUserQuery();

  if (!user) {
    return null;
  }

  const image = imageMap[user.general_condition];

  return (
    <div>
      <div
        className={cn(`fixed -z-100 inset-0`, className)}
        style={{
          backgroundImage: image ? `url(${image})` : undefined,
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
