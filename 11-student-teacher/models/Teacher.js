const mongoose=require("mongoose");

const teacherSchema= new mongoose.Schema({
    name:{type:String, required:true},
    subject:String,
    email:{type:String,unique:true}
});
module.exports=mongoose.model("Teacher",teacherSchema);