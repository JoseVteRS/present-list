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

import CreateListForm from "../forms/CreateListForm"

const CreateListModal = () => {
    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Crear nueva lista
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crear lista</DialogTitle>
                    <DialogDescription>
                        Crea una nueva lista
                    </DialogDescription>
                </DialogHeader>
                <CreateListForm />

            </DialogContent>
        </Dialog>

    )
}

export default CreateListModal