import db from "@/lib/prisma";
import { compareSync } from "bcrypt"
import { NextResponse } from "next/server";



async function authenticate(email: string, password: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("Not found")
        }

        const isPasswordCorrect = compareSync(password, user.password)

        if (!isPasswordCorrect) {
            throw new Error("Not found")
        }

        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error")
    }
}

export const userService = {
    authenticate
}