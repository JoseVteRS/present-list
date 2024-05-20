"use client";

import { Suspense } from "react";
import Link from "next/link";
import { DashboardSection } from "@/components/DashboardSection";
import { Loader2, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/utils/time-ago";

import { TableLoader } from "@/components/loaders/table-loader";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import CopyLinkDropdown from "@/components/list/copy-list-link-button";
import { DeletePresentDialog } from "@/components/present/dialogs/delete-present";
import { useGetPresents } from "@/server/services/present/api/use-get-presents";
import { useNewPresent } from "@/server/services/present/hooks/use-new-present";
import { PresentWithList } from "@/server/types/present";

export default function DashboardUserPresentPage() {
  const { data: presents, isLoading } = useGetPresents();
  const newPresetModal = useNewPresent();

  return (
    <DashboardSection title="Regalos">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Regalos</h1>
        <Button onClick={newPresetModal.onOpen} size="sm" className="my-5">
          <Plus className="size-4 mr-2" /> Añadir regalo
        </Button>
      </div>

      {isLoading ? (
        <TableLoader />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Lista</TableHead>

              <TableHead>Fecha creación</TableHead>
              <TableHead>Última actualización</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="max-w-max">
            <Suspense fallback={<Loader2 />}>
              {presents?.map((item: PresentWithList) => (
                <TableRow key={item.id} className="group w-full h-[100px]">
                  <TableCell className="w-[250px] align-top">
                    <span className="font-semibold text-sm m-0 p-0">
                      {item.name}
                    </span>
                    <div className="flex md:hidden md:group-hover:flex gap-1.5">
                      <Button variant="link" className="m-0 p-0">
                        <Link
                          className="text-xs"
                          href={`/dashboard/lista/${item.id}/edit`}
                        >
                          Editar
                        </Link>
                      </Button>
                      <Button variant="link" className="m-0 p-0">
                        <Link
                          className="text-xs"
                          href={`/dashboard/lista/${item.id}`}
                        >
                          Ver
                        </Link>
                      </Button>
                      <Button variant="link" className="m-0 p-0">
                        <span className="text-xs text-red-500">
                          <DeletePresentDialog present={item} />
                        </span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-max text-center">
                    {item.list?.name}
                  </TableCell>

                  <TableCell className="max-w-max">
                    {timeAgo(item.createdAt)}
                  </TableCell>
                  <TableCell className="max-w-max">
                    {timeAgo(item.updatedAt)}
                  </TableCell>
                  <TableCell className="text-start">
                    <div className="flex items-center justify-center">
                      <Button variant="ghost" size="icon" asChild>
                        <Link
                          href={`/lista/${item.id}`}
                          title="Compartir lista por Whatsapp"
                        >
                          <WhatsappIcon />
                        </Link>
                      </Button>
                      <CopyLinkDropdown
                        link={`${process.env.NEXT_PUBLIC_BASE_URL}/lista/${item.id}`}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </Suspense>
          </TableBody>
        </Table>
      )}
    </DashboardSection>
  );
}
