import z from 'zod'

const authRegister = z.object({
    username: z.string({ required_error: "User is required" })
        .min(3, {
            message: "User must be at least 3 characters"
        }),
    email: z.string({ required_error: "Email is required" })
        .email({ message: "Email is not valid" }),
    password: z.string({ required_error: "Password is required" })
        .min(6, {
            message: "Password must be at least 6 characters"
        })
})

const authLogin = z.object({
    email: z.string({ required_error: "Email is required" })
        .email(),
    password: z.string({ required_error: "Password is required" })
        .min(6, {
            message: "Password must be at least 6 characters"
        })
})

export {
    authRegister,
    authLogin
}