import ApiClient from "@/api/client";
import { useQuery } from "@tanstack/react-query";

export function useRandomNewsQuery() {
  const { data, ...rest } = useQuery({
    queryKey: [],
    queryFn: () => ApiClient.getRandomNews(),
  });

  return { news: data, ...rest };
}
