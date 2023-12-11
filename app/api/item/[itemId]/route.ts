import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

interface Params {
    params: { itemId: string }
}

export async function PUT(req: Request, ctx: Params) {
    const { userId } = await req.json()

    if (!ctx.params.itemId) {
        return new NextResponse("ItemID es necesario", { status: 400 })
    }
    console.log({userId, itemId: ctx.params.itemId})
    try {
        await prisma.item.update({
            where: {
                id: ctx.params.itemId,
                userId: userId,
                isPicked: true
            },
            data: {
                isPicked: true
            }
        })
        return NextResponse.json({message: "Presetn picked"})
    } catch (error) {
        console.error(error)
    }
}