"use server"
import  {db} from "@/server/db"
import { getUserByEmail } from "@/server/utils/users"
import { getVerificationTokenByToken } from "@/server/utils/verification-tokens"

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token)

    if (!existingToken) {
        return { error: "Token no existe" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) {
        return { error: "Token ha expirado" }
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return { error: "Email no existe" }
    }

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return { success: "Email verificado!" }
}