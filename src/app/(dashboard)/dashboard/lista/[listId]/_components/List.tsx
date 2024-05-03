"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link";
import { ListWithPresents } from "@/types/list";
import { Badge } from "@/components/ui/badge";
import { ListSkeleton } from "./ListSkeleton";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/utils/time-ago";



export const ListItem = ({ listId }: { listId: string }) => {


  const [list, setList] = useState<ListWithPresents | null>(null)

  useEffect(() => {
    fetch(`/api/list/${listId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then((data) => {
        setList(data)
        console.log({ data })
      })

  }, [listId])

  if (!list) return (<div className="space-y-3">
    <ListSkeleton />
    <ListSkeleton />
    <ListSkeleton />
  </div>)

  if (list && list._count.presents == 0) return (<div className="text-center">
    <p>No hay regalos vinculados a esta lista</p>
    <Button>Crea un regalo</Button>

  </div>)

  return (
    <Suspense fallback="Cargando lista" >
      <div className="grid gap-3">

        {
          list.presents.map((item) => (
            <div key={item.id} className="border rounded-md p-3">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">{item.name}</h3>
                <span className="text-xs text-neutral-600">
                  {timeAgo(item.createdAt) }
                </span>
              </div>

              {item.link && (
                <Link href={item.link} rel="noopener noreferrer" target="_blank">{item.link}</Link>
              )}


              {item.description && (<div className="text-neutral-600">
                {item.description}
              </div>)}

              {
                item.isActive
                  ? <Badge variant="success">Publico</Badge>
                  : <Badge variant="destructive">Oculto</Badge>
              }

            </div>
          ))
        }

      </div>

    </Suspense>
  )
}
