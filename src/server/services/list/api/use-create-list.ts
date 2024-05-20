import { z } from "zod";
import { listCreate } from "@/server/actions/list";
import { ListCreate } from "@/server/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { List } from "@prisma/client";
import { toast } from "sonner";

type ResponseType = Promise<[string | null, null | List]>;
type RequestType = z.infer<typeof ListCreate>;

export const useCreateList = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, RequestType>({
    mutationFn: async (data) => {
      const [error, list] = await listCreate(data);
      if (error) return [error, null];
      return [null, list];
    },
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    onError: () => {
      toast.error("Algo ha fallado al crear la lista");
    },
  });

  return mutation;
};
