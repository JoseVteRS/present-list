import { listGetAllByOwn } from "@/server/actions/list";
import { presentGetAll } from "@/server/actions/present";
import { useQuery } from "@tanstack/react-query";

export const useGetPresents = () => {
  const query = useQuery({
    queryKey: ["presents"],
    queryFn: async () => {
      const [error, presents] = await presentGetAll();
      if (error) {
        throw new Error(typeof error === 'string' ? error : 'Error fetching presents');
      }
      return presents;
    },
  });
  return query;
};
