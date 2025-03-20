"use client";

import Background from "@/components/background";
import { useUserQuery } from "@/hooks/useUserQuery";

export default function HomePage() {
  const { user } = useUserQuery();

  console.log(user);
  const condition = user?.general_condition;
  console.log(condition);

  return (
    <main className="h-dvh flex flex-col justify-center items-center">
      <div className="bg-card p-4 rounded-md">
        <h1>Welcome to the Home Page</h1>
        {JSON.stringify(user)}
      </div>
    </main>
  );
}
