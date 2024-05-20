import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CreatePresentForm } from "@/components/present/form/create-form-present";
import { useNewPresent } from "@/server/services/present/hooks/use-new-present";
import { useCreatePresent } from "@/server/services/present/api/use-create-present";
import { PresentCreate } from "@/server/schemas";

export const CreatePresentModal = () => {
  const { isOpen, onClose } = useNewPresent();
  const mutation = useCreatePresent();

  const onSubmit = (values: z.infer<typeof PresentCreate>) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear regalo</DialogTitle>
          <DialogDescription>
            Crea un nuevo regalo y añadelo a una lista
          </DialogDescription>
        </DialogHeader>
        <CreatePresentForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
            description: "",
            link: "",
            listId: undefined,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
