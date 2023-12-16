"use client"

import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const NameForm = () => {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const response = await fetch('/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, username })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
        }

    }

    return (
        <section className="flex items-center justify-center">
            <div className="">
                <form onSubmit={handleOnSubmit} className="flex flex-col gap-2 justify-between w-full">
                    <Input
                        type="text" name="name" id="name" placeholder='Nombre'
                        onChange={event => setName(event.target.value)}
                    />
                    <Input
                        type="text" name="username" id="username" placeholder='Nombre de usuario'
                        onChange={event => setUsername(event.target.value)}
                    />
                    <Button
                        type='submit'
                        disabled={isLoading}
                    >Guardar</Button>
                </form>

            </div>
        </section>
    )
}
