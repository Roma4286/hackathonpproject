import Card from "@/components/ui/card";
import { toast } from "sonner";

export const showMessage = (message: string) => {
  return toast.custom(() => {
    return <Card className="px-4 py-2 min-w-96 font-pixelated">{message}</Card>;
  });
};
