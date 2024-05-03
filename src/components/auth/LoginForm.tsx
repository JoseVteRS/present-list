"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { login } from "@/server/actions/login"
import { LoginSchema } from "@/server/schemas"

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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormError } from "@/components/FormError"
import { FormSuccess } from "@/components/FormSuccess"


export function LoginForm() {
    const [isClient, setIsClient] = useState(false)
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()

    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider"
        : ""

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(data.error)
                    }
                    if (data?.success) {
                        form.reset()
                        setError(data.success)
                    }
                    if (data?.twoFactor) {
                        setShowTwoFactor(true)
                    }
                })
                .catch(() => setError("Algo salió mal"))
        })
    }



    useEffect(() => { setIsClient(true) }, [])
    if (!isClient) return (<></>)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Inicia sesión
                </CardTitle>
                <CardDescription>
                    Para continuar creando listas
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Two Factor Code</FormLabel>
                                        <FormControl>
                                            <Input disabled={isPending} placeholder="1234"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {
                            !showTwoFactor && (
                                <>
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
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contraseña</FormLabel>
                                                <FormControl>
                                                    <Input disabled={isPending} type="password"  {...field} />
                                                </FormControl>
                                                <Button asChild size="sm" variant="link" className="px-0 font-normal">
                                                    <Link href="/auth/reset">¿Has olvidado la contraseña?</Link>
                                                </Button>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )
                        }
                        <FormError message={error || urlError} />
                        <FormSuccess message={success} />
                        <Button type="submit" variant="primary" className="w-full">
                            {showTwoFactor ? "Confirmar":"Iniciar sesión"}
                            </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <p>¿No tienes cuenta? <Link href="/auth/register" className="text-fuchsia-800  hover:underline">Regístrate</Link></p>
            </CardFooter>
        </Card>

    )
}