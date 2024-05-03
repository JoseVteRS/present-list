import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    id: string
    role: UserRole;
    username: string;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
    limitLists: number
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user?: {
            username: string,
            limitLists: number
        } & DefaultSession["user"]
    }
}