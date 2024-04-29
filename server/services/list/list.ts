import { currentUser } from "@/lib/auth"
import db from "@/lib/prisma"
import { List } from "@prisma/client"


type ResultType = [string | null, List[] | null]

const getListById = async (listId: string) => {
    if (!listId) {
        return ["listId is required", null]
    }

    try {

        const list = await db.list.findUnique({
            where: { id: listId }
        })

        if (!list) return ["List not found", null]

        return [null, list]

    } catch (error) {
        if (error instanceof Error) {
            return [error.message, null]
        } else {
            return [error, null]
        }
    }
}



const getListByOwner = async (listId: string, userId: string) => {

    if (!userId) {
        return ["Not found", null]
    }

    if (!listId) {
        return ["listId is required", null]
    }

    try {

        const list = await db.list.findFirst({
            where: { id: listId, userId }
        })

        if (!list) return ["List not found", null]

        return [null, list]

    } catch (error: any) {
        if (error instanceof Error) {
            return [error.message, null]
        } else {
            return [error, null]
        }
    }
}

const getAllByUserId = async (userId: string): Promise<ResultType> => {

    if (!userId) return ["userId is requried", null]
    if (typeof userId !== "string") return ["userId must be a string", null];

    try {
        const presentLists = await db.list.findMany({
            where: {
                userId: userId,
                isActive: true
            }
        });

        if (!presentLists) return ["Not found present Lists", null];
        return [null, presentLists];

    } catch (error) {
        if (error instanceof Error) return [error.message, null];
        return ["Something went wrong", null];
    }

}

const getAllByUserEmail = async (email: string): Promise<ResultType> => {

    if (!email) return ["userId is requried", null];
    if (typeof email !== "string") return ["userId must be a string", null];

    try {
        const presentLists = await db.list.findMany({
            where: {
                user: {
                    email: email
                }
            }
        });

        if (!presentLists) return ["Not found present Lists", null];
        return [null, presentLists];

    } catch (error) {
        if (error instanceof Error) return [error.message, null];
        return ["Something went wrong", null];
    }

}


export const listService = {
    getListById,
    getListByOwner,
    getAllByUserId,
    getAllByUserEmail,
}