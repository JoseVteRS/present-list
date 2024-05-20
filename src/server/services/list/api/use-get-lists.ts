import { listGetAllByOwn } from "@/server/actions/list";
import { useQuery } from "@tanstack/react-query";

export const useGetLists = () => {
  const query = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const [error, lists] = await listGetAllByOwn();
      if (error) {
        throw new Error(error);
      }
      return lists;
    },
  });
  return query;
};
