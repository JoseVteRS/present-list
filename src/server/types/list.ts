import { Present, List, User } from "@prisma/client";

export type ListWithPresents = List & { presents: Present[], _count: { presents: number } };
export type ListWithPresentsAndUser = List & { presents: Present[], user: User };
export type ListsWithPresentsQueryResult = [string | null, ListWithPresents[] | null]
export type ListWithPresentsQueryResult = [string | null, ListWithPresents | null]