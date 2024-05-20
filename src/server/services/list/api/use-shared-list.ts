import { listGetAllByOwn, listGetByIdShared } from "@/server/actions/list";
import { useQuery } from "@tanstack/react-query";

export const useGetSharedList = (listId: string) => {
  const query = useQuery({
    enabled: !!listId,
    queryKey: ["shared-list", { listId }],
    queryFn: async () => {
      const [error, list] = await listGetByIdShared(listId);
      if (error) {
        throw new Error("Failed to fetch list");
      }
      return list;
    },
  });
  return query;
};