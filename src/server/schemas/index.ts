import * as z from "zod"


export const SettingsSchema = z.object({
    name: z.string().min(1, { message: "Se requiere un nombre" }),
    email: z.string().email(),
    isTwoFactorEnabled: z.boolean()
})
// .refine((data) => {
//     if(data.newPassword) {

//     }
// })
export const LoginSchema = z.object({
    email: z.string().email({ message: "Se requiere el correo electrónico" }),
    password: z.string().min(1, { message: "Se requiere la contraseña" }),
    code: z.optional(z.string())
})

export const NewPassword = z.object({
    password: z.string().min(6, { message: "Se requieren mínimo 6 caracteres" }),
})
export const ResetSchema = z.object({
    email: z.string().email({ message: "Se requiere el correo electrónico" }),
})

export const RegisterSchema = z.object({
    email: z.string().email({ message: "Se requiere el correo electrónico" }),
    password: z.string().min(6, { message: "Se requieren mínimo 6 caracteres" }),
    name: z.string().min(1, { message: "Se requiere el nombre" }),
    username: z.string().min(1, { message: "Se requiere el nombre de usuario" }),
})



export const ListCreate = z.object({
    name: z.string().min(3, { message: "El nombre debe tener una longitud mínima de 3" }),
    isActive: z.boolean().default(true)
})


export const PresentCreate = z.object({
    name: z.string().min(3, { message: "El nombre debe tener una longitud mínima de 3" }),
    link: z.optional(z.string()),
    description: z.optional(z.string()),
    listId: z.optional(z.string())
})


export const ListEdit = z.object({
    name: z.string().min(3, { message: "El nombre debe tener una longitud mínima de 3" }),
    isActive: z.boolean(),
    presents: z.array(PresentCreate)
})


