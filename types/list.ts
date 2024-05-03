import { Item, List } from "@prisma/client";

export type ListWithPresents = List & { presents: Item[], _count: {presents: number} };