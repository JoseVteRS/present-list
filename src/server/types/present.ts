import { Item, List } from "@prisma/client";

export type PresentWithList = Item & { list: List | null }

export type PresentGetAllResult = [string | null, PresentWithList[] | null]
export type PresentGetByIdResult = [string | null, PresentWithList | null]