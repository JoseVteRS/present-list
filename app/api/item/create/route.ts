import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const getUser = () => {
    const userFromCookies = cookies().get("user")

    if (!userFromCookies) return
    return JSON.parse(userFromCookies.value)
}

export async function POST(req: Request) {
    const { name, description, link } = await req.json()
    const user = getUser()

    try {

        const newItem = await prisma.item.create({
            data: {
                name,
                description,
                link,
                userId: user.id
            }
        })

        return NextResponse.json(newItem)

    } catch (error: any) {
        return new NextResponse(`Error: ${error.message}`, { status: 500 })
    }
}

