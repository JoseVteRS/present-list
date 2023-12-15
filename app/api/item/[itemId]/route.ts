import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

interface Params {
    params: { itemId: string }
}

export async function PUT(req: Request, ctx: Params) {
    const { userId } = await req.json()
    const { params: { itemId } } = ctx

    if (!itemId) {
        return new NextResponse("ItemID es necesario", { status: 400 })
    }

    console.log({ userId, itemId })

    try {
        await prisma.item.update({
            where: {
                id: itemId,
                userId: userId,
                isPicked: false
            },
            data: {
                isPicked: true
            }
        })
        return NextResponse.json({ message: "Presetn picked" })
    } catch (error: any) {
        console.error(error)
        return new NextResponse(`Internal server error: ${error.message}`, { status: 400 })
    }
}