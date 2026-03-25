const express=require("express");
require("dotenv").config()
const app= express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("api isleyir")
})

const PORT=process.env.PORT||3000

app.listen(PORT,()=>{
    console.log(`SERVER RUNNIG ON ${PORT}`);
    
})

const connectDB = require("./config")

connectDB()