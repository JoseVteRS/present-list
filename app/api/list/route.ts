import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { listCreate } from "@/actions/list";
import { ListCreate } from "@/schemas";
import db from "@/lib/prisma"
import { currentUser } from "@/lib/auth";
import { listService } from "@/server/services/list/list";

interface Params {
    params: {
        userId: string
    }
}

export async function GET() {

    const user = await currentUser()
    
    try { 
        const [error, lists] = await listService.getAllByUserId(user!.id)

        if (error) {
            return new NextResponse(error, { status: 403 })
        }

        return NextResponse.json(lists)

    } catch (error: any) {
        return new NextResponse(`Something went wrong: ${error.message}`, { status: 500 })
    }
}


export async function POST(req: Request, ctx: Params) {
    const user = await auth()
    if (!user) {
        redirect('/auth/login')
    }

    const data = (await req.json() as z.infer<typeof ListCreate>)

    try {
        const newList = await listCreate(data)

        return NextResponse.json({ list: newList })

    } catch (error: any) {
        return new NextResponse(`Something went wrong: ${error.message}`, { status: 500 })
    }
}