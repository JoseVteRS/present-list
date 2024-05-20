import { z } from "zod";
import { presentCreate } from "@/server/actions/present";
import { PresentCreate } from "@/server/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { List } from "@prisma/client";
import { toast } from "sonner";

type ResponseType = Promise<[string | null, null | List]>;
type RequestType = z.infer<typeof PresentCreate>;

export const useCreatePresent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, RequestType>({
    mutationFn: async (data) => {
      const [error, present] = await presentCreate(data);
      if (error) return [error, null];
      return [null, present];
    },
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["presents"] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    onError: () => {
      toast.error("Algo ha fallado al crear el regalo");
    },
  });

  return mutation;
};
