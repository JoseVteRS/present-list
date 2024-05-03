"use server"

import { z } from "zod"

import { ResetSchema } from "@/server/schemas"
import { getUserByEmail } from "@/server/utils/users"
import { sendPasswordResetEmail } from "@/server/utils/mail"
import { generatePasswordResetToken } from "@/server/utils/tokens"


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