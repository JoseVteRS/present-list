import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"
import { cookies } from "next/headers";

interface Params {
    params: {
        userId: string
    }
}

export async function GET(req: Request, ctx: Params) {
    try {

        const list = await prisma.item.findMany({
            where: {
                userId: ctx.params.userId,
            },
            include: {
                user: true
            },

        })
        if (!list) {
            return new NextResponse("No hay elementos", { status: 404 })
        }

        return NextResponse.json(list)

    } catch (error: any) {
        return new NextResponse(`Internal server Error: ${error.message}`, { status: 500 })
    }
}