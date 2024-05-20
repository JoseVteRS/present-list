"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ListCreate, ListEdit } from "@/server/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateList } from "@/server/services/list/api/use-create-list";


type Props = {
  id?: string;
  defaultValues?: z.infer<typeof ListCreate | typeof ListEdit>;
  onSubmit: (values: z.infer<typeof ListCreate  | typeof ListEdit>) => void;
  disabled?: boolean;
};

export const ListForm = ({ id, defaultValues, onSubmit, disabled }: Props) => {
  const form = useForm<z.infer<typeof ListCreate>>({
    resolver: zodResolver(ListCreate),
    defaultValues: defaultValues,
  });

  console.log({defaultValues})

  const handleSubmit = async (values: z.infer<typeof ListCreate>) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la lista</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Lista Navidad"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center m-0 mt-5 p-0 gap-3">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Switch
                  disabled={disabled}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="mt-5">
          <Button disabled={disabled} type="submit" variant="brand">
            {!!id ? "Editar" : "Guardar"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

