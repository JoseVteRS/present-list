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

import { CreatePresentForm } from "@/components/present/form/CreatePresentForm"


export const CreatePresentModal = () => {

    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Crear regalo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crear regalo</DialogTitle>
                    <DialogDescription>
                        Crea un nuevo regalo y añadelo a una lista
                    </DialogDescription>
                </DialogHeader>
                <CreatePresentForm  />

            </DialogContent>
        </Dialog>

    )
}
