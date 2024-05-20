import { listGetAllByOwn } from "@/server/actions/list";
import { useQuery } from "@tanstack/react-query";

export const useGetPresent = (listId?: string) => {
  const query = useQuery({
    enabled: !!listId,
    queryKey: ["present", { listId }],
    queryFn: async () => {
      const [error, list] = await listGetAllByOwn();
      if (error) {
        throw new Error("Failed to fetch list");
      }
      return list;
    },
  });
  return query;
};