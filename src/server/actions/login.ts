"use server"

import  {db} from "@/server/db"
import { getUserByEmail } from "@/server/utils/users"
import { getVerificationTokenByEmail } from "@/server/utils/verification-tokens"
import { sendVerificationEmail, sendTwoFactorEmail } from "@/server/utils/mail"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/server/schemas"
import { signIn } from "@/auth"
import { z } from "zod"
import { AuthError } from "next-auth"
import { generateTwoFactorToken, generateVerificationToken } from "@/server/utils/tokens"
import { getTwoFactorTokenByEmail } from "@/server/utils/two-factor-token"
import { getTwoFactorConfirmationByUserId } from "@/server/utils/two-factor-confirmation"



export const login = async (values: z.infer<typeof LoginSchema>, callback?: string | null) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalids fields" }
    }

    const { email, password, code } = validatedFields.data
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exists" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await getVerificationTokenByEmail(existingUser.email)

        if (!verificationToken) return
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return {
            success: "Se ha enviado un email de confirmación"
        }
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {

        if (!code) {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
            await sendTwoFactorEmail(
                twoFactorToken.email,
                twoFactorToken.token
            )
            return { twoFactor: true }
        } else {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
            if (!twoFactorToken) {
                return { error: "Invalid code" }
            }
            if (twoFactorToken.token !== code) {
                return { error: "Invalid code" }
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date()
            if (hasExpired) {
                return { error: "Code expired" }
            }


            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id }
            })

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id }
                })
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            })

        }


    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callback || DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" }
                default:
                    return { error: "Something wend wrong" }
            }
        }
    }
}