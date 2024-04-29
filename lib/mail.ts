import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const APP_NAME = "ListaRegalos"
const APP_EMAIL = "<onboarding@josevte.com>"
const FROM_EMAIL = `${APP_NAME} ${APP_EMAIL}`

export const sendPasswordResetEmail = async (email: string, token: string) => {
    if (!email || !token) return

    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

    await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset password</p>`
    })
}

export const sendVerificationEmail = async (email: string, token: string) => {

    if (!email || !token) return

    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`,
    })
}

export const sendTwoFactorEmail = async (email: string, token: string) => {
    if (!email || !token) return

    await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Código 2FA",
        html: `<p>Tu código: ${token}</p>`
    })
}