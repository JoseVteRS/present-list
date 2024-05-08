import { Suspense } from "react";
import { Item, List } from "@prisma/client"
import { Loader2 } from "lucide-react";
import { DashboardSection } from "@/components/DashboardSection";
import { CreatePresentModal } from "@/components/present/modals/create-modal-present";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { presentGetAll } from "@/server/actions/present";
import { EditPresentModal } from "@/components/present/modals/edit-modal-present";
import { DeletePresentDialog } from "@/components/present/dialogs/delete-present";
import { TableLoader } from "@/components/loaders/table-loader";
import { PresentWithList } from "@/server/types/present";



export default async function DashboardUserRegaloPage() {

  const [error, presents] = await presentGetAll()

  if (error) return <div>{error as string}</div>

  return (

    <DashboardSection title="Regalos" >
      <div className="mt-2">
        <CreatePresentModal />
      </div>
      {
        !presents
          ? <TableLoader />
          : <Table className="border p-3 mt-5">
            <TableHeader className="dark:bg-neutral-900">
              <TableRow>
                <TableHead className="text-left">Nombre</TableHead>
                <TableHead className="text-center">Lista</TableHead>
                <TableHead className="text-center">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="max-w-max">
              {typeof presents !== "string" && presents.map((item: PresentWithList) => {
                // if (!item) return <>Cargando</>
                
                return (
                  <TableRow key={item.id} className="group w-full" >
                    <TableCell className="max-w-max h-[100px] align-top">
                      <span className="font-semibold text-base m-0 p-0">
                        {item.name}
                      </span>
                      <div className="flex md:hidden md:group-hover:flex gap-1.5">
                        <EditPresentModal id={item.id} />
                        <Button variant="link" className="m-0 p-0 font-normal">
                          <span >Ver</span>
                        </Button>
                        <Button variant="link" className="m-0 p-0 font-normal">
                          <DeletePresentDialog present={item} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-max text-center">
                      {item?.list?.name}
                    </TableCell>
                    <TableCell className="max-w-max">
                      {item.isActive
                        ? <Badge>Publicado</Badge>
                        : <Badge variant="outline">Oculto</Badge>
                      }
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
      }
    </DashboardSection>
  );
}