"use client";

import { ReactNode, useEffect } from "react";
import { useUserQuery } from "@/hooks/useUserQuery";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import Background from "@/components/background";
import { showMessage } from "@/lib/showMessage";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useUserQuery();

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/auth/login");
    }
  }, [user, router, isLoading]);

  useEffect(() => {
    const condition = user?.general_condition;
    if (condition === "Excellent") {
      showMessage("Congrats! Your world condition is excellent");
    } else if (condition === "Bad") {
      showMessage("You have destroyed the world! Fix it please");
    }
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Background condition={user?.general_condition}>{children}</Background>
  );
}
