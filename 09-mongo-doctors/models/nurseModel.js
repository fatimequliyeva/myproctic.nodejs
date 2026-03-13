const mongoose=require("mongoose");
const {Schema}=mongoose

const NurseSchema=new Schema({
    name:String,
    surname:String,
    email:String,
    age:Number
})
const NurseModel=mongoose.model('Nurse',NurseSchema)

module.exports=NurseModel