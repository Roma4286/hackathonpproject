"use client";

import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { showMessage } from "@/lib/showMessage";
import { toast } from "sonner";

export default function RandomNews() {
  return (
    <div className="flex flex-col justify-center items-center h-dvh ">
      <Card>
        huj
        <Button
          onClick={() => showMessage("Hello, this is a custom toast message")}
        >
          Click
        </Button>
      </Card>
    </div>
  );
}
