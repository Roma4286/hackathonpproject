"use client";

import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import useCheckAnswerMutation from "@/hooks/useCheckAnswerMutation";
import { useRandomNewsQuery } from "@/hooks/useRandomNewsQuery";
import Link from "next/link";

export default function RandomNews() {
  const { news, isLoading } = useRandomNewsQuery();
  const {
    mutate,
    isPending: isMutationPending,
    data,
  } = useCheckAnswerMutation();

  if (isLoading) {
    return <Card className="w-96">Loading...</Card>;
  }

  if (!news) {
    return <Card>News not found</Card>;
  }

  const { name, news_id, text } = news;

  const handleAnswer = (answer: boolean) => {
    mutate({ news_id, answer });
  };

  if (data) {
    return (
      <Card>
        <h1>{data.message}</h1>
        <Button asChild>
          <Link href="/home">Go home</Link>
        </Button>
        <Button asChild variant={"secondary"}>
          <Link href="/news/random">Next news</Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-2">
      <h1 className="text-xl font-bold">{name}</h1>
      <p>{text}</p>
      <div className="flex gap-4 justify-center">
        <Button
          onClick={() => handleAnswer(false)}
          disabled={isMutationPending}
          variant={"destructive"}
        >
          False
        </Button>
        <Button
          onClick={() => handleAnswer(true)}
          disabled={isMutationPending}
          variant={"success"}
        >
          True
        </Button>
      </div>
    </Card>
  );
}
