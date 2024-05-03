"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState, useTransition } from "react"
import { LOGIN_FORM_ERROR_MESSAGES } from "@/common/messages"
import Link from "next/link"
import { RegisterSchema } from "@/server/schemas"
import { register } from "@/actions/register"
import { FormError } from "./FormError"
import { FormSuccess } from "./FormSuccess"

const formSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email({ message: LOGIN_FORM_ERROR_MESSAGES.INVALID_EMAIL }),
    password: z.string().min(1, { message: LOGIN_FORM_ERROR_MESSAGES.INVALID_PASSWORD }),
})

export function RegisterForm() {
    const [isClient, setIsClient] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            username: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError("")
        setSuccess("")

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        })

    }

    useEffect(() => { setIsClient(true) }, [])
    if (!isClient) return (<></>)
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Registro
                </CardTitle>
                <CardDescription>
                    Regístrate y crea tus listas de regalos
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Jose" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre de usuario</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Jose" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo eletrónico</FormLabel>
                                    <FormControl>
                                        <Input placeholder="jose@web.com" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button type="submit" variant="primary">Registrarse</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <p>¿Ya tienes cuenta? <Link href="/auth/login" className="text-fuchsia-800  hover:underline">Inicia sesión</Link></p>
            </CardFooter>
        </Card>
    )
}