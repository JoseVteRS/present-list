"use server"

import z from "zod"
import { SettingsSchema } from "@/server/schemas"
import { db } from "@/server/db"
import { auth } from "@/auth"
import { getUserByEmail, getUserById } from "@/server/utils/users"
import { generateVerificationToken } from "@/server/utils/tokens"
import { sendVerificationEmail } from "@/server/utils/mail"

type ResultType = [string | null, any | null]

export const settings = async (values: z.infer<typeof SettingsSchema>): Promise<ResultType> => {
    const currentuser = await auth()
    if (!currentuser) {
        return ["Unauthorized", null]
    }

    const dbUser = await getUserById(currentuser.user.id)
    if (!dbUser) {
        return ["Unauthorized", null]
    }

    if (values.email && values.email !== currentuser.user.email) {

        const existingUser = await getUserByEmail(values.email)
        if (existingUser && existingUser.id !== currentuser.user.id) {
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