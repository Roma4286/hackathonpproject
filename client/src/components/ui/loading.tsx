import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-dvh flex flex-col justify-center items-center">
      <LoaderCircle className="size-5 text-muted-foreground animate-spin" />
    </div>
  );
}
