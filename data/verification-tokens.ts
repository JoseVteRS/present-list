import db from "@/lib/prisma";

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verifiationToken = await db.verificationToken.findUnique({
            where: { token: token }
        })

        return verifiationToken

    } catch (error) {
        return null
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try {

        const verifiationToken = await db.verificationToken.findFirst({
            where: { email }
        })

        return verifiationToken

    } catch (error) {
        return null
    }
}