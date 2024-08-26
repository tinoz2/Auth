import { z } from "zod"

export const registerSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(8, {
        message: "Email must be at least 8 characters.",
    }).email({ message: "Email is not valid" }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export const loginSchema = z.object({
    email: z.string().min(8, {
        message: "Email must be at least 8 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export const codeSchema = z.object({
    code: z.string().min(6).max(6)
})

export const emailSchema = z.object({
    email: z.string().min(8, {
        message: "Email must be at least 8 characters.",
    }).email({ message: "Email is not valid" }),
})

export const passwordSchema = z.object({
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})