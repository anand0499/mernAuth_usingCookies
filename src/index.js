const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const router=require("./routes/user-routes")

const app=express()
dotenv.config()
app.use(cors({
    origin: 'http://localhost:3000', // Specify the origin of your front-end
    credentials: true,
  }));
app.use(cookieParser())
app.use(express.json())
app.use('/auth',router)

mongoose.connect(process.env.DATABASE_URL)
app.listen(process.env.PORT,()=>console.log("Server is Running on Port",process.env.PORT))








// app.use("/",(req,res,next)=>{
//     res.send("hello World!!")
// })

// app.listen(5000,()=>{
//     console.log("Server is Running to localhost:5000")
// })