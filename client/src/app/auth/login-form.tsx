"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import PixelatedButton from "@/components/ui/pixelated-button";

type FormFields = {
  username: string;
  password: string;
};

type Props = {
  className?: string;
  onSubmit?: (data: FormFields) => void;
  disabled?: boolean;
  type: "login" | "signup";
};

export function LoginForm({ className, onSubmit, disabled, type }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSubmit?.({ username, password });
  };

  return (
    <form className={cn("grid gap-6", className)}>
      <Label className="grid gap-2">
        Username{" "}
        <Input
          disabled={disabled}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          name="username"
          type="text"
          placeholder="macsbook"
          required
        />
      </Label>

      <Label className="grid gap-2">
        Password{" "}
        <Input
          disabled={disabled}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={type === "login" ? "current-password" : "new-password"}
          name="password"
          type="password"
          required
        />
      </Label>

      <PixelatedButton
        onClick={handleSubmit}
        type="button"
        disabled={disabled}
        className="w-full"
      >
        Login
      </PixelatedButton>
    </form>
  );
}
