"use client";

import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { completeIntro, getIntroCompleted } from "./introCompletedHelper";

function BackgroundImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div
      className={cn(`fixed -z-100 inset-0`)}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "darken",
        filter: "brightness(0.4)",
      }}
    />
  );
}

type StepProps = {
  nextStep: () => void;
};

const steps: React.FC<StepProps>[] = [
  FirstStep,
  SecondStep,
  ThirdStep,
  FourthStep,
];

export default function IntroPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const introCompleted = getIntroCompleted();
    if (introCompleted) {
      router.push("/home");
    }
  }, [router]);

  const handleFinalStep = () => {
    completeIntro();
    router.push("/home");
  };

  const nextStep = () => {
    const finalStep = steps.length - 1;

    if (step < finalStep) {
      setStep((prev) => prev + 1);
    } else {
      handleFinalStep();
    }
  };

  const Step = steps[step];

  return <Step nextStep={nextStep} />;
}

function FirstStep({ nextStep }: StepProps) {
  return (
    <div
      onClick={nextStep}
      className="flex flex-col items-center justify-center h-dvh text-white"
    >
      <BackgroundImage imageUrl="/intro-background.jpeg" />
      <h1 className="text-6xl font-extrabold mb-4">MythBusters</h1>
      <p className="text-xl">In a world full of lies can you find the truth?</p>
    </div>
  );
}

function SecondStep({ nextStep }: StepProps) {
  return (
    <div
      onClick={nextStep}
      className="flex flex-col items-center justify-center h-dvh"
    >
      <BackgroundImage imageUrl="/intro-background.jpeg" />
      <Image
        className="pixel-corners"
        src={"/unknown-person.png"}
        width={100}
        height={400}
        alt="person"
      />
      <Card className="max-w-96">
        It is currently the year 2130.. the world is filled with misinformation
        where telling the truth and lies apart is an almost impossible task...
        you have been hired as a fact-checker your mission is to help humanity
        choose a better future .... your choices will shape the outcome of this
        world can you save it ?
      </Card>
    </div>
  );
}

function ThirdStep({ nextStep }: StepProps) {
  return (
    <div
      onClick={nextStep}
      className="flex flex-col items-center justify-center h-dvh"
    >
      <BackgroundImage imageUrl="/intro-background.jpeg" />
      <Image
        className="pixel-corners"
        src={"/unknown-person.png"}
        width={100}
        height={400}
        alt="person"
      />
      <Card className="max-w-96">
        As a fact-checker you'll face a series of news headlines filled with
        truth and lies.... you job is simple: choose whether each headline is
        true or false. but your decisions are far from trivial-each choice you
        make will have its consequences...
      </Card>
    </div>
  );
}

function FourthStep({ nextStep }: StepProps) {
  const [answer, setAnswer] = useState<boolean | null>(null);

  if (answer === false) {
    return (
      <div
        onClick={nextStep}
        className="flex flex-col items-center justify-center h-dvh"
      >
        <BackgroundImage imageUrl="/bad-background.jpeg" />
        <Card className="max-w-96">
          Denying climate science leads to worsening natural disasters. CO2
          emissions rise the world suffers from pollution and the damage to the
          planet becomes irreversible
        </Card>
      </div>
    );
  }

  if (answer === true) {
    return (
      <div
        onClick={nextStep}
        className="flex flex-col items-center justify-center h-dvh"
      >
        <BackgroundImage imageUrl="/second-intro-background.png" />
        <Card className="max-w-96">
          the world embraces renewable energy c02 emissions decrease and society
          starts healing climate action is a priority - future generations will
          thank you effort
        </Card>
      </div>
    );
  }

  if (answer === null) {
    return (
      <div className="flex flex-col items-center justify-center h-dvh">
        <BackgroundImage imageUrl="/intro-background.jpeg" />
        <Card className="max-w-96">
          <h1 className="mb-4">
            Is climate change real? A debate ignites over the future of our
            planet
          </h1>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setAnswer(true)} variant="success">
              True
            </Button>
            <Button onClick={() => setAnswer(false)} variant="destructive">
              False
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}
