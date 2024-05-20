import { listGetAllByOwn, listGetById } from "@/server/actions/list";
import { useQuery } from "@tanstack/react-query";

export const useGetList = (listId?: string) => {
  const query = useQuery({
    enabled: !!listId,
    queryKey: ["list", { listId }],
    queryFn: async () => {
      if(!listId) throw new Error("No se ha especificado el id de la lista");
      const [error, list] = await listGetById(listId);
      if (error) {
        throw new Error("Error al obtener la lista");
      }
      console.log({ list });
      return list;
    },
  });
  return query;
};
