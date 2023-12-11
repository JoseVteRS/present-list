import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    const { name, username } = await req.json()


    try {
        const existUser = await prisma.user.findFirst({
            where: {
                username: username
            }
        })

        if (existUser) {
            return new NextResponse("Usuario ya existe", { status: 400 })
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                username
            }
        })

        return NextResponse.json(newUser)
    } catch (error: any) {
        console.log(error)
        return new NextResponse("Internal server error", { status: 500 })
    }

}