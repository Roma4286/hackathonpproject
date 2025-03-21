"use client";

import Background from "@/components/background";
import PixelatedButton from "@/components/ui/pixelated-button";
import { useUserQuery } from "@/hooks/useUserQuery";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Test: React.FC<{ test: string }> = ({ test }) => <div>{test}</div>;

export default function HomePage() {
  const { user } = useUserQuery();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const { general_condition, misinformation_level, pollution, trust_science } =
    user;

  return (
    <main className="h-dvh flex flex-col justify-center items-center">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-md text-center flex flex-col gap-4">
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

        <PixelatedButton asChild>
          <Link href={"/random-news"}>Get random news</Link>
        </PixelatedButton>
      </div>
    </main>
  );
}
