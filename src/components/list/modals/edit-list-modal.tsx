import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCreateList } from "@/server/services/list/api/use-create-list";
import { ListCreate, ListEdit } from "@/server/schemas";
import { useOpenList } from "@/server/services/list/hooks/use-open-list";
import { ListForm } from "../forms/list-form";
import { useGetList } from "@/server/services/list/api/use-get-list";
import { useEditList } from "@/server/services/list/api/use-edit-list";

export const EditListModal = () => {
  const { isOpen, onClose, id } = useOpenList();

  const listQuery = useGetList(id);
  const editMutation = useEditList(id);

  const defaultValues = listQuery.data
    ? { name: listQuery.data.name, isActive: listQuery.data.isActive }
    : { name: "", isActive: true };

  const onSubmit = (values: z.infer<typeof ListEdit>) => {
    editMutation.mutate(values, {
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
          id={id}
          onSubmit={onSubmit}
          disabled={editMutation.isPending}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
};
