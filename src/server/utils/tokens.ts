import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/server/db";
import { getVerificationTokenByEmail } from "@/server/utils/verification-tokens"
import { getPasswordResetTokenByEmail } from "@/server/utils/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/server/utils/two-factor-token";

const MILISECONDS_TO_EXPIRES = 5 * 60 * 1000

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getPasswordResetTokenByEmail(email)

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id }
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email, token, expires
        }
    })

    return passwordResetToken


}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const verficationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    });

    return verficationToken;
};


export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString()

    //TODO: Later change 10-15 minutes
    const expires = new Date(new Date().getTime() + MILISECONDS_TO_EXPIRES)

    const existingToken = await getTwoFactorTokenByEmail(email)
    if (existingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return twoFactorToken

}

