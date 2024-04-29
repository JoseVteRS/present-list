import { currentUser } from "@/lib/auth"
import db from "@/lib/prisma"
import { PresentCreate } from "@/schemas"
import { Item } from "@prisma/client"
import { z } from "zod"

type ResultCreateItemType = [string | null, Item | null]

const create = async (values: z.infer<typeof PresentCreate>): Promise<ResultCreateItemType> => {

  const user = await currentUser()
  if (!user) {
    return ["Unauthorized", null]
  }

  const validatedFields = PresentCreate.safeParse(values)
  if (!validatedFields.success) {
    return ["Campos incorrectos", null]
  }

  const { name, description, link, listId } = validatedFields.data

  const newPresent = await db.item.create({
    data: {
      name,
      description,
      link,
      userId: user.id,
      listId: listId ?? undefined
    }
  })

  return [null, newPresent]
}


export const presentService = {
  create
}