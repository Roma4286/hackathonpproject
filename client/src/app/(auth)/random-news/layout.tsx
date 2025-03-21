import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col justify-center items-center h-dvh">
      {children}
    </main>
  );
}
