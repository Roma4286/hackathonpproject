"use client";

import { LoginForm } from "../login-form";
import { useMutation } from "@tanstack/react-query";
import ApiClient from "@/api/client";
import { LoginDto } from "@/api/types/auth.dto";
import Link from "next/link";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { showMessage } from "@/lib/showMessage";
import { ApiError } from "@/api/types/apiError";

export default function LoginPage() {
  const router = useRouter();
  const { mutate, isPending } = useMutation<
    void,
    AxiosError<ApiError>,
    LoginDto
  >({
    mutationFn: (data) => ApiClient.login(data),
    onSuccess: () => {
      showMessage("Successfully logged in");
      router.push("/home");
    },
    onError: (error) => {
      const details = error.response?.data.detail;
      if (typeof details === "string") {
        showMessage(details);
      } else {
        showMessage("An error occurred");
      }
    },
  });

  return (
    <div className="flex flex-col gap-4 p-6 md:p-10 items-center justify-center">
      <div className="w-full max-w-xs">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <LoginForm
          onSubmit={mutate}
          disabled={isPending}
          type="login"
          className="mt-6"
        />
        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
