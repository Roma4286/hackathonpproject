import ApiClient from "@/api/client";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
  const { data, ...rest } = useQuery({
    queryKey: ["user"],
    queryFn: () => ApiClient.getUser(),
  });

  return { user: data, ...rest };
}
