import { z } from "zod";
import { listCreate, listUpdate } from "@/server/actions/list";
import { ListCreate, ListEdit } from "@/server/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { List } from "@prisma/client";
import { toast } from "sonner";

type ResponseType = Promise<[string | null, null | List]>;
type RequestType = z.infer<typeof ListEdit>;

export const useEditList = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, RequestType>({
    mutationFn: async (data) => {
      if (!id) {
        throw new Error("No se ha especificado el id de la lista");
      }
      const [error, list] = await listUpdate(id, data);
      if (error) {
        throw new Error("Error al actualizar la lista");
      };
      return list;
    },
    onSuccess: () => {
      toast.success("Lista actualizada correctamente");
      queryClient.invalidateQueries({ queryKey: ["list"] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    onError: () => {
      toast.error("Algo ha fallado al crear la lista");
    },
  });

  return mutation;
};
