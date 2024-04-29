"use server"

import { z } from "zod"

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/users"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"


export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalids fields" }
    }

    const { email } = validatedFields.data
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exists" }
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

    return { success: "Email de recuperación de contraseña ha sido enviado" }
}