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
        
        return NextResponse.json({ message: "Present picked" })
    } catch (error: any) {
        console.error(error)
        return new NextResponse(`Internal server error: ${error.message}`, { status: 400 })
    }
}


export async function DELETE(req: Request, ctx: Params) {
    const { userId } = await req.json()
    const { params: { itemId } } = ctx

    if (!itemId) {
        return new NextResponse("ItemID es necesario", { status: 400 })
    }

    try {
        await prisma.item.delete({
            where: {
                id: itemId,
                userId: userId,
            }
        })
        return NextResponse.json({ message: "Item eliminado" })

    } catch (error) {

    }
}