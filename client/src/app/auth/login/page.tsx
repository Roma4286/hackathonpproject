"use client";

import { LoginForm } from "../login-form";
import { useMutation } from "@tanstack/react-query";
import ApiClient from "@/api/client";
import { toast } from "sonner";
import { ApiError, LoginDto } from "@/api/auth.dto";
import Link from "next/link";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation<
    unknown,
    AxiosError<ApiError>,
    LoginDto
  >({
    mutationFn: (data) => ApiClient.login(data),
    onSuccess: () => {
      toast.success("Successfully logged in");
      router.push("/home");
    },
    onError: (error) => {
      const details = error.response?.data.detail;
      if (typeof details === "string") {
        toast.error(details);
      } else {
        toast.error("An error occurred");
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
          onSubmit={mutateAsync}
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

  return (
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-balance text-sm text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <LoginForm
              onSubmit={mutateAsync}
              disabled={isPending}
              type="login"
            />
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
