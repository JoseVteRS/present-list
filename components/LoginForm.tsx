'use client'

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

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
        <form onSubmit={handleSubmit(handleOnSubmit)} className="w-full flex items-center gap-2">
            <input
                className="input-text"
                type="text" id="username" placeholder="Introduce tu nombre de usuario"
                {...register("username")}
            />
            <button type="submit" className="btn">Login</button>
        </form>
    )
}

export default LoginForm