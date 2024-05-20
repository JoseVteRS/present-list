import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CreateListForm from "../forms/create-form-list";
import { useNewList } from "@/server/services/list/hooks/use-new-list";
import { useCreateList } from "@/server/services/list/api/use-create-list";
import { ListCreate } from "@/server/schemas";
import { ListForm } from "../forms/list-form";

const CreateListModal = () => {
  const { isOpen, onClose } = useNewList();
  const mutation = useCreateList();

  const onSubmit = (values: z.infer<typeof ListCreate>) => {
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
          <DialogTitle>Crear lista</DialogTitle>
          <DialogDescription>Crea una nueva lista</DialogDescription>
        </DialogHeader>
        <ListForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "", isActive: true }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateListModal;
