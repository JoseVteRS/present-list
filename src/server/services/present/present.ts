import { auth } from "@/auth"
import  {db} from "@/server/db"
import { PresentCreate } from "@/server/schemas"
import { Item } from "@prisma/client"
import { z } from "zod"

type ResultCreateItemType = [string | null, Item | null]
type ResultListItemType = [string | null, Item[] | null]

const create = async (values: z.infer<typeof PresentCreate>): Promise<ResultCreateItemType> => {

  const session = await auth()
  if (!session) {
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
      userId: session.user.id,
      listId: listId ?? undefined
    }
  })

  return [null, newPresent]
}


const getByUserId = async (userId: string): Promise<ResultListItemType> => {
  if (!userId) {
    return ["Unauthorized", null]
  }

  const presents = await db.item.findMany({
    where: { userId: userId }
  })

  if (!presents) {
    return ["No se han encontrado regalos", null]
  }

  return [null, presents]
}


export const presentService = {
  create,
  getByUserId
}