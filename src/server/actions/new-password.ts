"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"
import  {db} from "@/server/db"

import { getPasswordResetTokenByToken } from "@/utils/password-reset-token"
import { getUserByEmail } from "@/server/utils/users"
import { NewPassword } from "@/server/schemas"

export const newPassword = async (values: z.infer<typeof NewPassword>, token?: string | null) => {
    if (!token) {
        return { error: "No se ha encontrado el token" }
    }

    const validatedFields = NewPassword.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Campos inválidos" }
    }

    const { password } = validatedFields.data

    const existingToken = await getPasswordResetTokenByToken(token)
    if (!existingToken) {
        return { error: "Token no válido" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) {
        return { error: "Token has expired" }
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return { error: "El email no existe" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await db.user.update({
        where: { id: existingUser.id },
        data: {
            password: hashedPassword
        }
    })
    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    })

    return { success: "Contraseña actualizada" }

}