import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const getUser = () => {
    const userFromCookies = cookies().get("user")

    if (!userFromCookies) return
    return JSON.parse(userFromCookies.value)
}

export async function GET() {

    const user = getUser()

    try {

        const itemsFromUser = await prisma.item.findMany({
            where: {
                userId: user.id
            },
        })

        if (itemsFromUser) {
            return NextResponse.json(itemsFromUser)
        }

    } catch (error: any) {
        return new NextResponse(`Error ${error.message}`, { status: 500 })
    }
}