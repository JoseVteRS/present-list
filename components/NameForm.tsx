"use client"

import { FormEvent, useState } from "react";

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
                <form onSubmit={handleOnSubmit} className="flex justify-between w-full">
                    <input
                        className='input-text mr-5'
                        type="text" name="name" id="name" placeholder='Nombre'
                        onChange={event => setName(event.target.value)}
                    />
                    <input
                        className='input-text mr-5'
                        type="text" name="username" id="username" placeholder='Nombre de usuario'
                        onChange={event => setUsername(event.target.value)}
                    />
                    <button
                        className='btn'
                        type='submit'
                        disabled={isLoading}
                    >Guardar</button>
                </form>

            </div>
        </section>
    )
}
