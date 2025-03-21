"use client";

import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { useRandomNewsQuery } from "@/hooks/useRandomNewsQuery";

export default function RandomNews() {
  const { news, isPending } = useRandomNewsQuery();

  if (isPending) {
    return <Card className="w-96">Loading...</Card>;
  }

  if (!news) {
    return <Card>News not found</Card>;
  }

  const { name, news_id, text } = news;

  return (
    <Card>
      <h1 className="text-xl font-bold">{name}</h1>
      <p>{text}</p>
      <Button variant={"destructive"}>False</Button>
      <Button variant={"success"}>True</Button>
    </Card>
  );
}
