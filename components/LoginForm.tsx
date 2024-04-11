'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "@radix-ui/react-label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"

const setCookiesSession = (user: any) => {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    document.cookie = `user=${JSON.stringify(user)}; expires=${date.toUTCString()}; path=/`;
}

const LoginForm = () => {
    const router = useRouter()
    const { handleSubmit, reset, register } = useForm()

    const handleOnSubmit = async (values: any) => {

        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: values.username })
            })

            const user = await res.json()
            setCookiesSession(user)

            router.push("/")
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <div className="w-full">
            {/* <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-2 justify-between w-full">
                <Input
                
                    type="text" id="username" placeholder="Introduce tu nombre de usuario"
                    {...register("username")}
                />
                <Button type="submit">Iniciar sesión</Button>
            </form> */}


            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Iniciar sesión</CardTitle>
                    {/* <CardDescription>
                        Introduce tu email y contraseña para continuar creando listas de regalo
                    </CardDescription> */}
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" />
                        </div>
                        <Button type="submit" className="w-full">
                            Iniciar sesión
                        </Button>
                        <Button variant="outline" className="w-full">
                            Inicia sesión con Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        ¿No tienes una cuenca?{" "}
                        <Link href="#" className="underline">
                            Regístrate
                        </Link>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

export default LoginForm