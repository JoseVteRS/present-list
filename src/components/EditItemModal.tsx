"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Present } from "@prisma/client";

interface EditItemModalProps {
  item: Present;
}

export const EditItemModal = ({ item }: EditItemModalProps) => {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      name: item.name,
      description: item.description,
      link: item.link,
    },
  });

  const onSubmit = async (data: any) => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/item/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    });
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger className="text-sky-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m12 8l-8 8v4h4l8-8m-4-4l2.869-2.869l.001-.001c.395-.395.593-.593.821-.667a1 1 0 0 1 .618 0c.228.074.425.272.82.666l1.74 1.74c.396.396.594.594.668.822a1 1 0 0 1 0 .618c-.074.228-.272.426-.668.822h0L16 12.001m-4-4l4 4"
          />
        </svg>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editando: {item.name}</DialogTitle>
        </DialogHeader>
        <>
          <form
            className="w-full flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <Input
                className="input-text-item"
                type="text"
                id={`name`}
                placeholder="Introduce el nombre del regalo"
                {...register("name")}
              />

              <Input
                className="input-text-item"
                type="text"
                id={`link`}
                placeholder="https://amazon.es"
                {...register("link")}
              />

              <Textarea
                className="input-text-item"
                id="description"
                cols={30}
                rows={10}
                {...register("description")}
              />
            </div>

            <div className="flex items-center justify-end gap-2 w-full">
              <Button type="submit">Guardar</Button>
            </div>
          </form>
        </>
      </DialogContent>
    </Dialog>
  );
};
