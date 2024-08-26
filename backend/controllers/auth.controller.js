import generateToken from '../lib/jwt.js';
import { sendResetPassword, sendVerificationEmail, successEmail, welcomeEmail } from '../mail/emails.js';
import User from '../schemas/user.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Name or email is already taken." });
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000

        const newUser = await User.create({ username, email, password: passwordHash, verificationToken, verificationTokenExpiresAt, isVerified: false })

        generateToken(newUser, res)

        await sendVerificationEmail(newUser.email, verificationToken)

        await welcomeEmail(newUser.email, newUser.username)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error to create your account" })
    }
}

const verifyEmail = async (req, res) => {

    const { code } = req.body

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" })
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()

        return res.status(200).json({ message: "Email verified successfully" });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error trying to verify your email" })
    }
}

const forgotPassword = async (req, res) => {

    const { email } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) return res.status(400).json({ success: false, message: "Email not found" })

        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

        user.resetPasswordToken = resetToken
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt
        await user.save()

        await sendResetPassword(user.email, `${process.env.CLIENT}/reset-password/${resetToken}`)

        return res.status(200).json({ message: "Password reset link sent to your email successfully" });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error trying to send you a email to reset your password" })
    }
}

const resetPassword = async (req, res) => {

    const { token } = req.params
    const { password } = req.body

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) return res.status(400).json({ success: false, message: "Expired or invalid reset password token" })

        const hashPassword = await bcrypt.hash(password, 10)

        user.password = hashPassword
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpiresAt = undefined
        await user.save()

        await successEmail(user.email)

        return res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error trying to change your password" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userFound = await User.findOne({ email })
        const passwordMatch = await bcrypt.compare(password, userFound.password)

        if (!userFound || !passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        generateToken(userFound, res)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error in log in" })
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie('token')
        res.json({ message: "Sesión cerrada correctamente" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al cerrar sesión" })
    }
}

const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")

        if (!user) return res.status(401).json({ message: "Usuario no encontrado" })

        res.status(200).json({ success: true, user })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Hubo un error al encontrar el perfil" })
    }
}

const users = async (req, res) => {
    try {
        const usersFound = await User.find()

        if (!usersFound) return res.status(401).json({ message: "Error al encontrar usuarios" })

        res.json(usersFound)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "No se encontraron usuarios" })
    }
}

export {
    register,
    login,
    logout,
    profile,
    users,
    verifyEmail,
    forgotPassword,
    resetPassword
}