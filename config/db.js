const mongoose = require("mongoose")
require ("dotenv").config() //load MONGOURI from .env

//function to connact to MongoDB
const connectDB = async ()=>{

    try{
        await mongoose.connect (process.env.MONGO_URI)
           
        
        console.log("MongoDB connected successfully")
    }

   catch (error){
        console.error("MongoDB connection failed",error.message)

        process.exit(1) // stop server if  DB connection fails
    }
}

//export the server to use in server.js
module.exports = connectDB