import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { username } = await req.json()

    console.log({username})

    try {
        const existUser = await prisma.user.findUnique({
            where: {
                username,
            }
        })

        console.log({existUser})

        if (!existUser) return

        return NextResponse.json(existUser, { status: 200 })

    } catch (error: any) {
        return new NextResponse(`Internal server error: ${error.message}`, { status: 500 })
    }
}