import { NextResponse } from "next/server"
import { z } from "zod"
import { currentUser } from "@/lib/auth"
import { PresentCreate } from "@/schemas"
import { presentService } from "@/server/services/present/present"


export async function POST(req: Request) {
    const user = await currentUser()
    console.log({ user })
    if (!user) {
        return new NextResponse("Forbidden resource", { status: 403 })
    }

    const values = (await req.json() as z.infer<typeof PresentCreate>)

    try {
        const [error, newItem] = await presentService.create(values)

        if (error) {
            return new NextResponse(error, { status: 400 })
        }

        return NextResponse.json(newItem)

    } catch (error: any) {
        return new NextResponse(`Error: ${error.message}`, { status: 500 })
    }
}

