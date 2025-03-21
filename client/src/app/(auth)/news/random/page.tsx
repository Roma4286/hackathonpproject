"use client";

import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

import useCheckAnswerMutation from "@/hooks/useCheckAnswerMutation";
import { useRandomNewsQuery } from "@/hooks/useRandomNewsQuery";

import Link from "next/link";

export default function RandomNews() {
  const { news, isFetching, refetch } = useRandomNewsQuery();
  const {
    mutate,
    reset,
    isPending: isMutationPending,
    data,
  } = useCheckAnswerMutation();

  function restart() {
    refetch();
    reset();
  }

  if (isFetching) {
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
      <Card className="space-y-4">
        <h1>{data.message}</h1>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/home">Go home</Link>
          </Button>
          <Button onClick={restart} variant={"secondary"}>
            Next news
          </Button>
        </div>
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
