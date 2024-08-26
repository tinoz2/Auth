import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    verificationToken: String,
    verificationTokenExpiresAt: String,
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    isVerified: Boolean
}, { timestamps: true })

export default mongoose.model('User', userSchema)