const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const studentRoutes = require("./routes/studentRoutes")
const auth= require("./middleware/authMiddleware")
const authRoutes = require("./routes/authRoutes")

// Connect DB
connectDB()

const app = express()

// ⚠️ Important: parse JSON before routes
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//server uploades images
app.use("/uploads",express.static("uploads"))

// Routes
app.use("/api/students", studentRoutes)
app.use ("/api/auth",authRoutes)

//auth protected routes

app.get ("/admin",auth,(req,res)=>{
    res.json({
        message:"Welcome Admin Dashboard!!"
    })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`))