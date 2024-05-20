"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { ListCreate, ListEdit } from "@/server/schemas";
import { db } from "@/server/db";
import { auth } from "@/auth";
import {
  ListsWithPresentsQueryResult,
  ListWithPresentsAndUser,
  ListWithPresentsQueryResult,
} from "@/server/types/list";
import { List } from "@prisma/client";

const LIST_ERROR = {
  UNAUTHORIZED_USER: "UNAUTHORIZED_USER",
  USER_REACHED_LIST_LIMIT: "USER_REACHED_LIST_LIMIT",
  NO_ID_LIST: "NO_ID_LIST",
};

const errorException = (error: any) => {
  if (error instanceof Error) {
    console.error(`Internal server error: ${error}.message`);
    return error.message;
  }
  console.error("Something went wrong");
  return "Something went wrong";
};

/**
 * Create a list
 * Authentication required
 * @returns Array [error, newList]
 */
export const listCreate = async (
  data: z.infer<typeof ListCreate>
): Promise<[string | null, List | null]> => {
  const currentUser = await auth();
  if (!currentUser) {
    console.error(LIST_ERROR.UNAUTHORIZED_USER);
    return ["Unauthorized. Please login", null];
  }

  const count = await db.list.count({
    where: {
      userId: currentUser.user.id,
    },
  });

  const limit = currentUser.user.limitLists;
  const role = currentUser.user.role;

  if (count >= limit && role !== "ADMIN" && role !== "PREMIUM") {
    console.error(LIST_ERROR.USER_REACHED_LIST_LIMIT);
    return [`You have reached the limit of ${limit} lists.`, null];
  }

  const validatedValues = ListCreate.safeParse(data);
  if (!validatedValues.success) {
    return ["Error en los campos", null];
  }

  const { name, isActive } = validatedValues.data;

  try {
    const newList = await db.list.create({
      data: {
        name: name,
        isActive: isActive,
        userId: currentUser.user.id,
      },
    });
    if (!newList) {
      return ["Error while creating list", null];
    }

    revalidatePath("/dashboard");
    return [null, newList];
  } catch (error: any) {
    if (error instanceof Error) {
      return [error.message, null];
    } else {
      return ["Something went wrong", null];
    }
  }
};

/**
 * Retrieve an array of lists
 * Authentication required
 * @returns Array [error, lists]
 */
export const listGetAllByOwn =
  async (): Promise<ListsWithPresentsQueryResult> => {
    const currentUser = await auth();
    if (!currentUser) {
      console.error("USER_NOT_AUTHENTICATED");
      return ["Not authenticated. Please login", null];
    }
    try {
      const lists = await db.list.findMany({
        where: {
          userId: currentUser.user.id,
        },
        include: {
          _count: {
            select: {
              presents: true,
            },
          },
          presents: true,
        },
      });

      if (!lists) {
        return ["No lists found", null];
      }

      return [null, lists];
    } catch (error) {
      return [errorException(error), null];
    }
  };

/**
 * Retrieve a list by id
 * NO authentication required
 */
export const listGetByIdShared = async (
  listId: string
): Promise<[string | null, ListWithPresentsAndUser | null]> => {
  if (!listId) {
    return ["No se ha encontrado la lista", null];
  }

  const currentUser = await auth();

  try {
    const list = await db.list.findFirst({
      where: {
        AND: [{ id: listId }, { isActive: true }],
      },
      include: {
        presents: true,
        user: true,
      },
    });

    if (!list) {
      return ["No existe la lista", null];
    }

    return [null, list];
  } catch (error) {
    if (error instanceof Error) {
      return [error.message, null];
    }
    return ["Something went wrong", null];
  }
};

/**
 * Retrieve a list by id
 * Authentication required
 * @param listId string
 * @returns
 */
export const listGetById = async (
  listId: string
): Promise<ListWithPresentsQueryResult> => {
  const currentUser = await auth();
  if (!currentUser) {
    console.error("USER_NOT_AUTHENTICATED");
    return ["Not authenticated. Please login", null];
  }

  try {
    const list = await db.list.findFirst({
      where: { id: listId },
      include: {
        _count: {
          select: {
            presents: true,
          },
        },
        presents: true,
      },
    });

    if (!list) {
      return ["List not found", null];
    }

    return [null, list];
  } catch (error) {
    if (error instanceof Error) {
      return [error.message, null];
    }

    return ["Something went wrong", null];
  }
};

/**
 * Update a list by id
 * Authentication required
 * @param listId string
 * @param values {z.infer<typeof ListEdit>}
 */
export const listUpdate = async (
  listId: string,
  values: z.infer<typeof ListEdit>
) => {
  const currentUser = await auth();
  if (!currentUser) {
    console.error(LIST_ERROR.UNAUTHORIZED_USER);
    return ["Unauthorized. Please login", null];
  }

  const validateValues = ListEdit.safeParse(values);
  if (!validateValues.success) {
    return ["Data error", null];
  }

  try {
    const { isActive, name } = validateValues.data;

    const existList = await db.list.findFirst({
      where: {
        id: listId,
        userId: currentUser.user.id,
      },
    });
    if (!existList) {
      return ["Not found list", null];
    }

    const updateList = await db.list.update({
      where: {
        id: existList.id,
        userId: currentUser.user.id,
      },
      data: {
        name,
        isActive,
      },
    });

    if (!updateList) {
      return ["Error on update list", null];
    }

    revalidatePath("/dashboard");
    return [null, updateList];
  } catch (error) {
    if (error instanceof Error) {
      return [error.message, null];
    }
    return ["Something wen wrong", null];
  }
};

/**
 * Delete a list by id
 * Authentication required
 * @param listId string
 */
export const listDelete = async (listId: string) => {
  const currentUser = await auth();
  if (!currentUser) {
    console.error(LIST_ERROR.UNAUTHORIZED_USER);
    return ["Unauthorized. Please login"];
  }

  if (!listId) {
    console.error(LIST_ERROR.NO_ID_LIST);
    return ["Falta el ID de la lista", null];
  }

  try {
    const deletedList = await db.list.delete({
      where: {
        id: listId,
        userId: currentUser.user.id,
      },
    });

    if (!deletedList) {
      return ["No se ha podido borrar la lista", null];
    }
    revalidatePath("/dashboard");
    return [null, true];
  } catch (error) {
    if (error instanceof Error) {
      return [error.message, null];
    }
    return ["Something wen wrong", null];
  }
};
