"use server"

import { ListCreate } from "@/schemas"
import { z } from "zod"
import db from "@/lib/prisma"
import { currentUser } from "@/lib/auth"


export const listCreate = async (data: z.infer<typeof ListCreate>) => {
    const user = await currentUser()

    if(!user) return Error("Necesitas iniciar sesión")

    try {
        const newList = await db.list.create({
            data: {
                name: data.name,
                isActive: data.isActive,
                userId: user.id
            }
        })
        if (!newList) {
            throw new Error(JSON.stringify({ status: 400, error: "No se ha podido guardar la nueva lista" }))
        }
        return newList

    } catch (error: any) {
        if (error instanceof Error) {
            throw new Error(JSON.stringify({ error: "Something went wrong", message: error.message }))
        } else {
            throw new Error(JSON.stringify({ error: "Error", message: error.message }))
        }
    }
}


