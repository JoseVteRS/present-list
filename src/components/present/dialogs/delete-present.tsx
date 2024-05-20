"use client"
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogDescription, DialogFooter,
  DialogHeader, DialogContent,
  DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import { listDelete } from '@/server/actions/list'
import { presentDelete } from '@/server/actions/present'
import { ListWithPresents } from '@/server/types/list'
import { Present } from '@prisma/client'
import React, { useState } from 'react'

export const DeletePresentDialog = ({ present }: { present: Present }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [error, setError] = useState<any>()
  const [success, setSuccess] = useState<any>()

  const handleOnDeleteClick = async () => {
    try {
      setIsLoading(true)
      const [error, deleted] = await presentDelete(present.id)

      if (error) {
        setError(error)
      }

      if (deleted) {
        setSuccess(`Regalo eliminado satisfactoriamente`)
      }

      setOpen(false)
    } catch (error: any) {
      console.error(`Error en el cliente cuando se ha intentado borrar un regalo: ${error.message}`)
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
          <DialogTitle>Eliminar <span className='text-fuchsia-800'>{present.name}</span></DialogTitle>
          <DialogDescription>
            Se elinará el regalo. Esta acción es permanente e irreversible
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
