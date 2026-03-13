const express= require("express");
const connectDB=require("./db");
const studentRoutes=require("./routes/studentRoutes")
const teacherRoutes=require("./routes/teacherRoutes")
const app=express();
app.use(express.json());

connectDB()
app.use("/students",studentRoutes)
app.use("/teachers",teacherRoutes)


const PORT=3000;
app.listen(PORT,()=>console.log(`server ${PORT}portunda isleyir`))