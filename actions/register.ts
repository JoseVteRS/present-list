"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"
import { RegisterSchema } from "@/schemas"
import { getUserByEmail } from "@/data/users"
import db from "@/lib/prisma"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { email, name, username, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email alrady in use" }
    }

    await db.user.create({
        data: {
            name: name,
            email: email,
            username: username,
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)
    return { success: "Confirmation email has been sent" }
}