

import { useEffect, useState } from "react";
import EditListForm from "@/components/list/forms/edit-form-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListWithPresents } from "@/server/types/list";
import { listGetById } from "@/server/actions/list";

interface ListEditPageProps {
  params: {
    listId: string
  }
}

export default async function ListEditPage({ params }: ListEditPageProps) {

  const [error, list] = await listGetById(params.listId)

  if (error) return <div>{error as string}</div>
  if (!list) return <div>Cargando lista</div>
  
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