import { Present, List } from "@prisma/client";

export type PresentWithList = Present & { list: List | null }


export type PresentGetAllResult = [string | null, PresentWithList[] | null]
export type PresentGetByIdResult = [string | null, PresentWithList | null]