"use client"
import { DashboardSection } from "@/components/DashboardSection";
import CreateListModal from "@/components/list/modals/CreateListModal";
import { List } from "@prisma/client"
import { Suspense, useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function DashboardUserListaPage() {

  const [isPending, startTransition] = useTransition()
  const [lists, setLists] = useState([])

  useEffect(() => {
    startTransition(() => {
      fetch("http://localhost:3000/api/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((data) => {
          data.json()
            .then(data => {
              setLists(data)
            })
        })
    })
  }, [])

  if (isPending) return (<>Cargando listas</>)

  return (

    <DashboardSection title="Listas" >
      <div className="mt-2">
        <CreateListModal />
      </div>
      <Table className="border p-3 mt-5">
        <TableHeader className="bg-neutral-200">
          <TableHead className="text-neutral-800">Nombre</TableHead>
          <TableHead className="text-neutral-800">Regalos</TableHead>
          <TableHead className="text-neutral-800">Estado</TableHead>
        </TableHeader>
        <TableBody className="max-w-max">
          <Suspense fallback={<Loader2 />}>
            {
              lists?.map((item: List) => (
                <TableRow key={item.id} className="group w-full">
                  <TableCell className="max-w-max">
                    <span className="font-semibold text-base m-0 p-0">
                      {item.name}
                    </span>
                    <div className="flex md:hidden md:group-hover:flex gap-1.5">
                      <Button variant="link" className="m-0 p-0 font-normal">
                        <span>Editar</span>
                      </Button>
                      <Button variant="link" className="m-0 p-0 font-normal">
                        <Link href={`/dashboard/lista/${item.id}`} >Ver</Link>
                      </Button>
                      <Button variant="link" className="m-0 p-0 font-normal">
                        <span className="text-red-500">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-max">
                    4
                  </TableCell>
                  <TableCell className="max-w-max">
                    {item.isActive ? "Publicada" : "Borrador"}
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