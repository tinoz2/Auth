import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const db = mongoose.connection

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connection to MongoDB was succesful')
    } catch (error) {
        console.error(error)
    }
}

db.once("open", () => {
    console.log("Connected to MongoDB")
})

db.on("error", () => {
    console.log("Error connecting to MongoDB")
})
