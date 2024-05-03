import { db } from "@/server/db"

export const getAccountByUserId = async (userId: string) => {

    try {
        const account = await db.account.findFirst({
            where: { userId }
        })

        if (!account) {
            return ["No account found", null]
        }

        return [null, account]
    } catch (error: any) {
        return [error.message, null]
    }

}