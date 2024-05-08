import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { EditPresentForm } from "../form/edit-form-present"
import { presentGetById } from "@/server/actions/present"
import { Item } from "@prisma/client"


export const EditPresentModal = async ({ id }: { id: string }) => {

  const [error, present] = await presentGetById(id)

  if (error) return <div>{error.toString()}</div>
  if (!present) return <div>Cargando datos</div>

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-sm p-0 m-0 font-normal">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar regalo</DialogTitle>
          <DialogDescription>
            Crea un nuevo regalo y añadelo a una lista
          </DialogDescription>
        </DialogHeader>
        <EditPresentForm present={present as Item} />

      </DialogContent>
    </Dialog>

  )
}
