import  'dotenv/config.js'
import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_DB)
    console.log('Connect to DB')
} catch (error) {
    console.log(error)
}