import { cn } from "@/lib/utils";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative p-6 bg-black text-center pixel-corners",
        className
      )}
    >
      <span className="absolute inset-0 bg-white -z-10 m-1 pointer-events-none pixel-corners"></span>
      {children}
    </div>
  );
}
