"use client"

import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { ListEdit, PresentCreate } from "@/server/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { ListWithPresents } from "@/types/list"
import { Checkbox } from "@/components/ui/checkbox"

const EditListForm = ({ list }: { list: ListWithPresents }) => {

    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const form = useForm<z.infer<typeof ListEdit>>({
        resolver: zodResolver(ListEdit),
        defaultValues: {
            isActive: list.isActive,
            name: list.name,
            presents: list.presents
        }
    })

    const presentsArray = useFieldArray({ control: form.control, name: "presents" })


    async function onSubmit(values: z.infer<typeof ListEdit>) {

        console.log(values)

        // try {
        //     await fetch(`/api/list/${list.id}/edit`, {
        //         method: 'PATCH',
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(values)
        //     })
        //     setSuccess("Lista actualizada")
        // } catch (error: any) {
        //     setError(error.message)
        // }
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


                {presentsArray.fields.map((field, index) => (
                    <div key={field.id} className="mt-3">
                        <FormField
                            name={`presents.${index}.isActive`}
                            control={form.control}
                            key={field.id}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="">Regalo - {index + 1}</FormLabel>
                                    <FormDescription className="asdf">
                                        Add variant option name
                                    </FormDescription>
                                    <div className='flex space-x-2'>
                                        <Checkbox  name={field.value} />
                                        <Button
                                            variant={'outline'}
                                            size={'sm'}
                                            className='text-red-500 hover:text-red-600'
                                            onClick={() => {
                                                presentsArray.remove(index);
                                            }}>
                                            X
                                        </Button>
                                        <Button
                                            variant={'outline'}
                                            size={'sm'}
                                            className='text-red-500 hover:text-red-600'
                                            onClick={() => {
                                                presentsArray.append(index);
                                            }}>
                                            +
                                        </Button>
                                    </div>
                                    <FormMessage />

                                </FormItem>
                            )}
                        >
                        </FormField>
                    </div>
                ))}


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