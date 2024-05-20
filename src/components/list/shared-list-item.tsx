"use client";
import { TableCell, TableRow } from "../ui/table";
import { Present } from "@prisma/client";

import { Button } from "../ui/button";

import { ExternalLinkIcon, GiftIcon, PackageOpenIcon } from "lucide-react";
import { usePickPresent } from "@/server/services/present/api/use-pick-present";
import { cn } from "@/utils";
import { useUnPickPresent } from "@/server/services/present/api/use-unpick-present";

interface Props {
  present: Present;
}

export const PresentItem = ({ present }: Props) => {
  const pickPresentMutation = usePickPresent(present.id);
  const unPickPresentMutation = useUnPickPresent(present.id);



  return (
    <TableRow className="h-[100px]">
      <TableCell
        className={cn("max-w-[250px]", {
          "opacity-50 line-through pointer-events-none select-none":
            present.isPicked,
        })}
      >
        {present.name}
      </TableCell>
      <TableCell
        className={cn("max-w-[250px]", {
          "opacity-50 line-through pointer-events-none select-none":
            present.isPicked,
        })}
      >
        {present.description}
      </TableCell>
      <TableCell>
        <div className="flex justify-end">
          {present.link && (
            <Button variant="ghost" size="icon">
              <a href={present.link} title="Enlace externo al artículo">
                <ExternalLinkIcon />
              </a>
            </Button>
          )}
          {!present.isPicked ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => pickPresentMutation.mutate(present.id)}
            >
              <PackageOpenIcon className="duration-700 animate-in fade-in-5 slide-in-from-top-2" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => unPickPresentMutation.mutate(present.id)}
            >
              <GiftIcon className="duration-700 animate-in fade-in-5 slide-in-from-top-2 stroke-emerald-600" />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
