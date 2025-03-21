import ApiClient from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "./queryKeys";

export function useUserQuery() {
  const { data, ...rest } = useQuery({
    queryKey: [QueryKeys.USER],
    queryFn: () => ApiClient.getUser(),
  });

  return { user: data, ...rest };
}
