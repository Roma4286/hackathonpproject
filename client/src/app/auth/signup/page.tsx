"use client";

import { LoginForm } from "../login-form";
import { useMutation } from "@tanstack/react-query";
import ApiClient from "@/api/client";
import { LoginDto } from "@/api/types/auth.dto";
import Link from "next/link";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { showMessage } from "@/lib/showMessage";
import { RawApiError } from "@/api/types/apiError";

export default function LoginPage() {
  const router = useRouter();
  const { mutate, isPending } = useMutation<
    void,
    AxiosError<RawApiError>,
    LoginDto
  >({
    mutationFn: (data) => ApiClient.signup(data),
    onSuccess: () => {
      showMessage("Your account has been successfully created");
      router.push("/auth/login");
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
          <h1 className="text-2xl font-bold text-center">Create an account</h1>
          <p className="text-balance text-sm text-muted-foreground text-center">
            Enter your username below to create an account
          </p>
        </div>
        <LoginForm
          onSubmit={mutate}
          disabled={isPending}
          type="signup"
          className="mt-6"
        />
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline underline-offset-4">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
