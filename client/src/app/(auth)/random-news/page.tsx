"use client";

import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { useRandomNewsQuery } from "@/hooks/useRandomNewsQuery";
import { showMessage } from "@/lib/showMessage";

export default function RandomNews() {
  const { news, isPending } = useRandomNewsQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!news) {
    return null;
  }

  const { name, news_id, text } = news;

  return (
    <div className="flex flex-col justify-center items-center h-dvh ">
      <Card>
        <h1 className="text-xl font-bold">{name}</h1>
        <p>{text}</p>
        <Button variant={"destructive"}>False</Button>
        <Button variant={"success"}>True</Button>
      </Card>
    </div>
  );
}
