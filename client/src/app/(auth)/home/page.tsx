"use client";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { useUserQuery } from "@/hooks/useUserQuery";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HomePage() {
  const { user } = useUserQuery();

  if (!user) {
    return null;
  }

  const { general_condition, misinformation_level, pollution, trust_science } =
    user;

  return (
    <main className="h-dvh flex flex-col justify-center items-center">
      <Card className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-primary ">
          Welcome to the Home Page
        </h1>
        <div className="space-y-2">
          <p className="text-lg">
            <span className="font-semibold">General Condition:</span>{" "}
            <span
              className={cn("font-bold", {
                "text-green-500": general_condition === "Excellent",
                "text-yellow-500": general_condition === "Normal",
                "text-red-500":
                  general_condition !== "Excellent" &&
                  general_condition !== "Normal",
              })}
            >
              {general_condition}
            </span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Misinformation Level:</span>{" "}
            {misinformation_level}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Pollution:</span> {pollution}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Trust Science:</span>{" "}
            {trust_science}
          </p>
        </div>

        <Button asChild>
          <Link href={"/news/random"}>Get random news</Link>
        </Button>
      </Card>
    </main>
  );
}
