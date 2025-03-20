"use client";

import { ReactNode, useEffect } from "react";
import { useUserQuery } from "@/hooks/useUserQuery";
import { useRouter } from "next/navigation";
import Loading from "../loading";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useUserQuery();

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/auth/login");
    }
  }, [user, router, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return children;
}
