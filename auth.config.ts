import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/users";

export default {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (passwordsMatch) return user;
                }

                return null;
            }
        })
    ]
} satisfies NextAuthConfig