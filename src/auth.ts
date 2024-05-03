import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/server/db"
import { getUserById } from "@/server/utils/users"
import { UserRole } from "@prisma/client"
import authConfig from "@/auth.config"
import { getTwoFactorConfirmationByUserId } from "@/server//utils/two-factor-confirmation"
import { getAccountByUserId } from "@/server/utils/account"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification

      if (account?.provider !== "credentials") return true

      const existingUser = await getUserById(user.id as string)

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false

      // Add 2AF check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        if (!twoFactorConfirmation) return false

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id
          }
        })
      }

      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.name = token.name as string
        session.user.username = token.username as string
        session.user.email = token.email as string
        session.user.isOAuth = token.isoAuth as boolean
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
        session.user.limitLists = token.limitLists as number
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.username = existingUser.username
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
      token.limitLists = existingUser.limitLists

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})