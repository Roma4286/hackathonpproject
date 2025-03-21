import ApiClient from "@/api/client";
import { AxiosApiError } from "@/api/types/apiError";
import { CheckAnswerDto } from "@/api/types/checkAnswer.dto";
import { CheckAnswerResponse } from "@/api/types/responses";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { QueryKeys } from "./queryKeys";

import { showMessage } from "@/lib/showMessage";

type Options = Omit<
  UseMutationOptions<CheckAnswerResponse, AxiosApiError, CheckAnswerDto>,
  "mutationFn"
>;

export default function useCheckAnswerMutation({
  onSuccess,
  onError,
  ...options
}: Options = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CheckAnswerResponse,
    AxiosApiError,
    CheckAnswerDto
  >({
    mutationFn: async (answer) => ApiClient.checkAnswer(answer),
    onError: (error, variables, context) => {
      const details = error.response?.data.detail;
      if (typeof details === "string") {
        showMessage(details);
      } else {
        showMessage("An error occurred");
      }
      onError?.(error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: [QueryKeys.USER] });
      onSuccess?.(data, variables, context);
    },
    ...options,
  });

  return mutation;
}
