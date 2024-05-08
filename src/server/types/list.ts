import { Item, List, User } from "@prisma/client";

export type ListWithPresents = List & { presents: Item[], _count: { presents: number } };
export type ListWithPresentsAndUser = List & { presents: Item[], user: User };
export type ListsWithPresentsQueryResult = [string | null, ListWithPresents[] | null]
export type ListWithPresentsQueryResult = [string | null, ListWithPresents | null]