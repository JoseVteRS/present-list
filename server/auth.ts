import { type NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { userService } from "./services/userService"
import prisma from "@/lib/prisma"


export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && account.type === "credentials") {
                token.userId = account.providerAccountId
            }

            return token
        },
        async session({ session, token, user }) {
            session.user.id = token.userId;
            return session
        }
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials as {
                    username: string
                    password: string
                };
                const user = await userService.authenticate(username, password);
                if (!user) {
                    return null;
                }
                return {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
}