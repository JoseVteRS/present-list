"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { login } from "@/server/actions/login"
import { ResetSchema } from "@/server/schemas"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormError } from "@/components/FormError"
import { FormSuccess } from "@/components/FormSuccess"

export function ResetForm() {
    const [isClient, setIsClient] = useState(false)
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("")
        setSuccess("")

        console.log(values)

        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }



    useEffect(() => { setIsClient(true) }, [])
    if (!isClient) return (<></>)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Recuperar contraseña
                </CardTitle>
                <CardDescription>
                    ¿Has olvidado tu contraseña?
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo electronico</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            placeholder="john.doe@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button type="submit" variant="primary" className="w-full">Recuperar contraseña</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <p>¿No tienes cuenta? <Link href="/auth/register" className="text-fuchsia-800  hover:underline">Regístrate</Link></p>
            </CardFooter>
        </Card>

    )
}