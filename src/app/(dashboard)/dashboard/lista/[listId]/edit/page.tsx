"use client"

import EditListForm from "@/components/list/forms/EditListForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListWithPresents } from "@/types/list";
import { useEffect, useState } from "react";

interface ListEditPageProps {
  params: {
    listId: string
  }
}

export default function ListEditPage({ params }: ListEditPageProps) {

  const [list, setList] = useState<ListWithPresents>()

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetch(`/api/list/${params.listId}`)
      const list = await response.json()
      setList(list)
    }


    fetchList()
  }, [params.listId])

  if (!list) return (<>Cargando datos de la lista</>)

  return (

    <div className="mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Editando <span className="text-fuchsia-600">{list.name}</span></CardTitle>
        </CardHeader>
        <CardContent>
          <EditListForm list={list} />
        </CardContent>
      </Card>
    </div>

  );
}