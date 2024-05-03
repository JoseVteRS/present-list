"use client"
import { DashboardSection } from "@/components/DashboardSection";
import CreateListModal from "@/components/list/modals/CreateListModal";
import { List } from "@prisma/client"
import { Suspense, useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useListStore from "@/server/store/list";
import { ListWithPresents } from "@/types/list";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/utils/time-ago";



export default function DashboardUserListaPage() {

  const [isPending, startTransition] = useTransition()
  const isCreated = useIsMounted()

  const { getListByUser } = useListStore()
  const { lists } = useListStore(state => ({
    lists: state.lists,

  }))


  useEffect(() => {
    startTransition(() => {
      getListByUser()
    })
  }, [getListByUser])

  if (!isCreated) return
  if (isPending) return (<>Cargando listas</>)

  return (

    <DashboardSection title="Listas" >
      <div className="mt-2">
        <CreateListModal />
      </div>
      <Table className="border p-3 mt-5">
        <TableHeader className="bg-neutral-200">
          <TableRow>
            <TableHead className="text-neutral-800">Nombre</TableHead>
            <TableHead className="text-neutral-800">Regalos</TableHead>
            <TableHead className="text-neutral-800">Estado</TableHead>
            <TableHead className="text-neutral-800">Fecha creación</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-w-max">
          <Suspense fallback={<Loader2 />}>
            {
              lists?.map((item: ListWithPresents) => (
                <TableRow key={item.id} className="group w-full">
                  <TableCell className="max-w-max">
                    <span className="font-semibold text-sm m-0 p-0">
                      {item.name}
                    </span>
                    <div className="flex md:hidden md:group-hover:flex gap-1.5">
                      <Button variant="link" className="m-0 p-0 font-normal">
                        <Link className="text-xs" href={`/dashboard/lista/${item.id}/edit`} >Editar</Link>
                      </Button>
                      <Button variant="link" className="m-0 p-0 font-normal">
                        <Link className="text-xs" href={`/dashboard/lista/${item.id}`} >Ver</Link>
                      </Button>
                      <Button variant="link" className="m-0 p-0 font-normal">
                        <span className="text-xs text-red-500">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-max">
                    {JSON.stringify(item._count.presents)}
                  </TableCell>
                  <TableCell className="max-w-max">
                    {item.isActive
                      ? <Badge variant="default">Publicada</Badge>
                      : <Badge variant="outline">Oculta</Badge>}
                  </TableCell>
                  <TableCell className="max-w-max">
                    {timeAgo(item.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            }
          </Suspense>
        </TableBody>

      </Table>
    </DashboardSection>
  );
}