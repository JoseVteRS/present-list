import {
  presentGetById,
  presentPick,
  presentUnPick,
  presentUpdate,
} from "@/server/actions/present";
import { getPickedPresents, setPickedPresents } from "@/server/utils/picked-presents";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookie } from "react-use";
import { toast } from "sonner";

export const usePickPresent = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, string>({
    mutationFn: async () => {
      const [error, pickPresent] = await presentPick(id);
      setPickedPresents([...getPickedPresents(), pickPresent?.id]);
      return pickPresent;
    },
    onSuccess: (data) => {
      toast.success("Regalo marcado", {
        description: id,
      });
      queryClient.invalidateQueries({ queryKey: ["present", { id }] });
      queryClient.invalidateQueries({ queryKey: ["presents"] });
      queryClient.invalidateQueries({ queryKey: ["shared-list"] });
    },
    onError: (error) => {
      toast.error("Algo ha fallado al marcar el regalo", {
        description: error.message,
      });
    },
  });
  return mutation;
};
