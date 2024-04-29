"use server"

import z from "zod"
import { SettingsSchema } from "@/schemas"
import db from "@/lib/prisma"
import { currentUser } from "@/lib/auth"
import { getUserByEmail, getUserById } from "@/data/users"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

type ResultType = [string | null, any | null]

export const settings = async (values: z.infer<typeof SettingsSchema>): Promise<ResultType> => {
    const user = await currentUser()
    if (!user) {
        return ["Unauthorized", null]
    }

    const dbUser = await getUserById(user.id)
    if (!dbUser) {
        return ["Unauthorized", null]
    }

    if (values.email && values.email !== user.email) {

        const existingUser = await getUserByEmail(values.email)
        if (existingUser && existingUser.id !== user.id) {
            return ["Email is already in use", null]
        }

        const verificationToken = await generateVerificationToken(
            values.email
        )

        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return [null, "Verification email sent"]
    }

    await db.user.update({
        where: {
            id: dbUser.id
        },
        data: {
            ...values
        }
    })

    return [null, "Los datos se han actualizado correctamente"]
}