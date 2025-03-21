import { cn } from "@/lib/utils";

export default function Card({
  children,
  innerClassName,
  outerClassName,
}: {
  children: React.ReactNode;
  innerClassName?: string;
  outerClassName?: string;
}) {
  return (
    <div className={cn("relative p-1", outerClassName)}>
      <span className="absolute inset-0 pointer-events-none bg-black pixel-corners"></span>
      <div
        className={cn(
          "bg-white border-none p-6 text-center pixel-corners",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
