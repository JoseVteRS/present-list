"use client"

import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { ListEdit, PresentCreate } from "@/server/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { ListWithPresents } from "@/server/types/list"
import { listUpdate } from "@/server/actions/list"


const EditListForm = ({ list }: { list: ListWithPresents }) => {

    const [success, setSuccess] = useState<any>()
    const [error, setError] = useState<any>()

    const form = useForm<z.infer<typeof ListEdit>>({
        resolver: zodResolver(ListEdit),
        defaultValues: {
            isActive: list.isActive,
            name: list.name
        }
    })

    async function onSubmit(values: z.infer<typeof ListEdit>) {
        try {
            const [error, updateList] = await listUpdate(list.id, values)
            if(error) {
                setError(error)
            }
            if(!error && updateList) {
                setSuccess("Lista actualizada")
            }
        } catch (error) {
            
        }
    }

    const isSubmitting = form.formState.isSubmitting

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Nombre de la lista
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                        <FormItem className="flex items-center m-0 mt-5 p-0 gap-3">
                            <FormLabel>
                                Estado
                            </FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                            <div>
                                {error}
                                {success}
                            </div>
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="brand"
                        className="mt-5"
                    >
                        {!isSubmitting
                            ? "Guardar"
                            : (<>
                                <Loader2 />
                                Guardando
                            </>)

                        }
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

export default EditListForm