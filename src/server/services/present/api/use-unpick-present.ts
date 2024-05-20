import { presentUnPick } from "@/server/actions/present";
import {
  getPickedPresents,
  removePickedPresent,
} from "@/server/utils/picked-presents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUnPickPresent = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, string>({
    mutationFn: async () => {
      const pickedPresents = getPickedPresents();
      const isPresentPicked = pickedPresents.includes(id);

      if (!isPresentPicked) {
        throw new Error("El regalo ya está marcado por otra persona");
      } else {
        const [error, unPickPresent] = await presentUnPick(id);
        removePickedPresent(unPickPresent!.id);
        return unPickPresent;
      }
    },
    onSuccess: (data) => {
      toast.success("Regalo  desmarcado", {
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
