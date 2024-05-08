"use server"

import { auth } from "@/auth"
import { db } from "@/server/db"
import { z } from "zod"
import { PresentCreate, PresentEdit } from "@/server/schemas"
import { Item } from "@prisma/client"
import { revalidatePath } from "next/cache"

const PRESENT_ERROR = {
  UNAUTHORIZED_USER: "UNAUTHORIZED_USER",
  USER_REACHED_PRESENT_LIMIT: "USER_REACHED_PRESENT_LIMIT",
  NO_ID_PRESENT: "NO_ID_PRESENT",
  VALUES_EDIT_PRESENT_ERROR: "VALUES_EDIT_PRESENT_ERROR",
  PRESENT_EDIT_ERROR_UPDATING: "PRESENT_EDIT_ERROR_UPDATING",
  PRESENT_EDIT_ERROR_CREATING: "PRESENT_EDIT_ERROR_CREATING",
}

type PresentPromiseReturn<T> = [string | null, T | null]

const errorException = (error: any) => {
  if (error instanceof Error) {
    console.error(`Internal server error: ${error}.message`)
    return error.message
  }
  console.error("Something went wrong")
  return "Something went wrong"
}

/**
 * Create a new Present+
 * Authentication required
 * @param values 
 * @returns 
 */
export const presentCreate = async (values: z.infer<typeof PresentCreate>): Promise<PresentPromiseReturn<Item>> => {
  const currentUser = await auth()
  if (!currentUser) {
    console.error(PRESENT_ERROR.UNAUTHORIZED_USER)
    return ["Unauthorized. Please login", null]
  }

  const validateValues = PresentCreate.safeParse(values)
  if (!validateValues.success) {
    return ["Error en los campos", null]
  }

  try {
    const dataValues = validateValues.data

    const newPresent = await db.item.create({
      data: {
        userId: currentUser.user.id,
        ...dataValues
      }
    })

    if (!newPresent) {
      console.error(PRESENT_ERROR.PRESENT_EDIT_ERROR_CREATING)
      return ["Error al crear un regalo", null]
    }

    return [null, newPresent]

  } catch (error) {
    return [errorException(error), null]
  }
}

/**
 * Retrieve list of presents
 * Authentication required
 * @returns Array of presents or error
 */
export const presentGetAll = async () => {
  const currentUser = await auth()
  if (!currentUser) {
    console.error(PRESENT_ERROR.UNAUTHORIZED_USER)
    return ["Unauthorized. Please login", null]
  }

  try {
    const presents = await db.item.findMany({
      where: {
        userId: currentUser.user.id
      },
      include: {
        list: true
      }
    })
    if (!presents) {
      return ["No hay regalos o no se han podido obtener", null]
    }

    return [null, presents]
  } catch (error) {
    return [errorException(error), null]
  }
}

/**
 * Retrieve a present by id
 * Authentication required
 * @param presentId string
 */
export const presentGetById = async (presentId: string) => {
  const currentUser = await auth()
  if (!currentUser) {
    console.error(PRESENT_ERROR.UNAUTHORIZED_USER)
    return ["Unauthorized. Please login", null]
  }

  if (!presentId) {
    return ["Es necesario proporcionar el ID del regalo", null]
  }

  try {

    const present = await db.item.findFirst({
      where: {
        id: presentId,
        userId: currentUser.user.id,
      }
    })

    if (!present) {
      return ["No se ha encontrado el regalo", null]
    }

    return [null, present]

  } catch (error) {
    return [errorException(error), null]
  }
}

/**
 * Update a present by id
 * Authentication required
 * @param presentId string
 * @param values
 */
export const presentUpdate = async (presentId: string, values: z.infer<typeof PresentEdit>) => {
  const currentUser = await auth()
  if (!currentUser) {
    console.error(PRESENT_ERROR.UNAUTHORIZED_USER)
    return ["Unauthorized. Please login", null]
  }

  if (!presentId) {
    console.error(PRESENT_ERROR.NO_ID_PRESENT)
    return ["Es necesario proporcionar un ID", null]
  }

  const validateValues = PresentEdit.safeParse(values)
  if (!validateValues.success) {
    console.error(PRESENT_ERROR.VALUES_EDIT_PRESENT_ERROR)
    return ["Uno o más campos tienen errores", null]
  }

  try {
    const dataValues = validateValues.data

    const updatedPresent = await db.item.update({
      where: {
        id: presentId,
        userId: currentUser.user.id
      },
      data: {
        ...dataValues
      }
    })

    if (!updatedPresent) {
      console.error(PRESENT_ERROR.PRESENT_EDIT_ERROR_UPDATING)
      return ["Error en la actualización del regalo", null]
    }

    return [null, updatedPresent]

  } catch (error) {
    return [errorException(error), null]
  }


}

export const presentDelete = async (presentId: string): Promise<PresentPromiseReturn<boolean>> => {

  const currentUser = await auth()
  if (!currentUser) {
    console.error(PRESENT_ERROR.UNAUTHORIZED_USER)
    return ["Unauthorized. Please loggin", null]
  }

  if (!presentId || typeof presentId !== "string") {
    return ["Se requiere el ID del regalo", null]
  }


  try {
    const deletedPresent = await db.item.delete({
      where: {
        id: presentId,
        AND: {
          userId: currentUser.user.id
        }
      }
    })


    if (!deletedPresent) {
      return ["Error al eliminar el regalo", null]
    }

    revalidatePath('/dashboard/regalo')

    return [null, true]


  } catch (error) {
    return [errorException(error), null]
  }
}

export const presentPick = async (presentId: string): Promise<PresentPromiseReturn<boolean>> => {
  if (!presentId || typeof presentId !== "string") {
    return ["Se requiere el ID del regalo", null]
  }

  try {

    const pickedPresent = await db.item.update({
      where: {
        id: presentId
      },
      data: {
        isPicked: true
      }
    })

    if (!pickedPresent) {
      return ["No existe regalo", null]
    }

    revalidatePath('/lista/[listId]')

    return [null, true]

  } catch (error) {
    return [errorException(error), null]
  }

}