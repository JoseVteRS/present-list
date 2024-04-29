import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { listService } from "@/server/services/list/list";
import { getToken } from "next-auth/jwt";
import { auth } from "@/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies, headers } from "next/headers";
import { getSession } from "next-auth/react";


interface Params {
  params: {
    listId: string
  }
}

export async function GET(req: Request, ctx: Params) {

  const { params } = ctx

  try {
    const [error, newItem] = await listService.getAllByUserId(params.listId)

    if (error) {
      return new NextResponse(error, { status: 400 })
    }

    return NextResponse.json(newItem)

  } catch (error: any) {
    return new NextResponse(`Error: ${error.message}`, { status: 500 })
  }
}
