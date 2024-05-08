"use client"
import { DashboardSection } from "@/components/DashboardSection";
import CreateListModal from "@/components/list/modals/create-modal-list";
import { Suspense, useEffect, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useListStore from "@/server/store/list";
import { ListWithPresents } from "@/server/types/list";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/utils/time-ago";
import { DeleteListDialog } from "@/components/list/dialogs/delete-list";
import { TableLoader } from "@/components/loaders/table-loader";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import CopyLinkDropdown from "@/components/list/copy-list-link-button";



export default function DashboardUserListaPage() {

  const [isPending, startTransition] = useTransition()
  const isComponentMounted = useIsMounted()

  const { getListByUser } = useListStore()
  const { lists } = useListStore(state => ({
    lists: state.lists,
  }))


  useEffect(() => {
    startTransition(() => {
      getListByUser()
    })
  }, [getListByUser])

  if (!isComponentMounted) return


  return (

    <DashboardSection title="Listas" >
      <div className="mt-2">
        <CreateListModal />
      </div>
      {
        isPending
          ? <TableLoader />
          : <Table >
            <TableHeader >
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Regalos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha creación</TableHead>
                <TableHead>Última actualización</TableHead>
                <TableHead>Compartir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="max-w-max">
              <Suspense fallback={<Loader2 />}>
                {
                  lists?.map((item: ListWithPresents) => (
                    <TableRow key={item.id} className="group w-full h-[100px]">
                      <TableCell className="w-[250px] align-top">
                        <span className="font-semibold text-sm m-0 p-0">
                          {item.name}
                        </span>
                        <div className="flex md:hidden md:group-hover:flex gap-1.5">
                          <Button variant="link" className="m-0 p-0">
                            <Link className="text-xs" href={`/dashboard/lista/${item.id}/edit`} >Editar</Link>
                          </Button>
                          <Button variant="link" className="m-0 p-0">
                            <Link className="text-xs" href={`/dashboard/lista/${item.id}`} >Ver</Link>
                          </Button>
                          <Button variant="link" className="m-0 p-0">
                            <span className="text-xs text-red-500">
                              <DeleteListDialog list={item} />
                            </span>
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
                      <TableCell className="max-w-max">
                        {timeAgo(item.updatedAt)}
                      </TableCell>
                      <TableCell className="text-start">
                        <div className="flex items-center justify-center">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/lista/${item.id}`} title="Compartir lista por Whatsapp">
                              <WhatsappIcon />
                            </Link>
                          </Button>
                          <CopyLinkDropdown link={`${process.env.NEXT_PUBLIC_BASE_URL}/lista/${item.id}`} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </Suspense>
            </TableBody>

          </Table>
      }
    </DashboardSection>
  );
}
