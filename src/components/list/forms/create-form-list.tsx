"use client"

import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { ListCreate } from "@/server/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { listCreate } from "@/server/actions/list"
import { FormError } from "@/components/FormError"
import { FormSuccess } from "@/components/FormSuccess"
import { toast } from "sonner"

const CreateListForm = () => {

    const [success, setSuccess] = useState<any>()
    const [error, setError] = useState<any>()

    const form = useForm<z.infer<typeof ListCreate>>({
        resolver: zodResolver(ListCreate),
        defaultValues: {
            isActive: true,
            name: ""
        }
    })


    async function onSubmit(values: z.infer<typeof ListCreate>) {
        try {
            const [error, newList] = await listCreate(values)
            if (error) {
                toast.error(`${error}`)
            }
            if (!error && newList) {
                toast.success("Lista creada")
            }
        } catch (error: any) {
            setError(error.message)
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
                                <Input placeholder="Lista Navidad" {...field} />
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

                        </FormItem>
                    )}
                />

                <div className="my-5">
                    <FormError message={error} />
                    <FormSuccess message={success} />
                </div>


                <DialogFooter>
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="brand"
                    >

                        {!isSubmitting
                            ? "Guardar"
                            : (<>
                                <Loader2 />
                                Guardando
                            </>
                            )

                        }
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

export default CreateListForm