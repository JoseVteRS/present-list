"use client"
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogDescription, DialogFooter,
  DialogHeader, DialogContent,
  DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import { listDelete } from '@/server/actions/list'
import { ListWithPresents } from '@/server/types/list'
import React, { useState } from 'react'
import { toast } from 'sonner'

export const DeleteListDialog = ({ list }: { list: ListWithPresents }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const handleOnDeleteClick = async () => {
    try {
      setIsLoading(true)
      const [error, listDeleted] = await listDelete(list.id)
      setOpen(false)

      if (error) toast.error(error)
      if (listDeleted) toast.success("Lista eliminada correctamente")

    } catch (error: any) {
      console.error(`Error en el cliente cuando se ha intentado borrar una lista: ${error.message}`)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className='m-0 p-0 text-xs text-red-400'>Eliminar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar <span className='text-fuchsia-800'>{list.name}</span></DialogTitle>
          <DialogDescription>
            Se elinará la lista y todos sus regalos. Esta acción es permanente e irreversible
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isLoading} variant="destructive" onClick={handleOnDeleteClick}>
            {isLoading ? "Borrando" : "Borrado"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
