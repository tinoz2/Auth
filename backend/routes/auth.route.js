import { Router } from "express";
const route = Router()
import validate from '../middlewares/validate.middleware.js'
import { register, login, logout, profile, users, verifyEmail, forgotPassword, resetPassword } from '../controllers/auth.controller.js'
import { authLogin, authRegister } from "../middlewares/zod.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

route.post('/register', validate(authRegister), register)

route.post('/login', validate(authLogin), login)

route.post('/verify-email', verifyEmail)

route.post('/forgot-password', forgotPassword)

route.post('/reset-password/:token', resetPassword)

route.get('/profile', validateToken, profile)

route.get('/users', users)

route.post('/logout', logout)

export default route