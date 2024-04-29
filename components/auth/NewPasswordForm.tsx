"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { login } from "@/actions/login"
import { NewPassword } from "@/schemas"

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
import { reset } from "@/actions/reset"
import { newPassword } from "@/actions/new-password"


export function NewPasswordForm() {
    const [isClient, setIsClient] = useState(false)
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const token = searchParams.get('token')

    const form = useForm<z.infer<typeof NewPassword>>({
        resolver: zodResolver(NewPassword),
        defaultValues: {
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof NewPassword>) => {
        setError("")
        setSuccess("")

        console.log(values)

        startTransition(() => {
            newPassword(values, token)
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
                    Nueva contraseña
                </CardTitle>
                <CardDescription>
                    Escribe una nueva contraseña
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nueva contraseña</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            disabled={isPending}
                                            placeholder="******"
                                            {...field} />
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
                <div className="text-center w-full">
                    <Link href="/auth/login" className="text-fuchsia-800  hover:underline">Voler al Login</Link>
                </div>
            </CardFooter>
        </Card>

    )
}