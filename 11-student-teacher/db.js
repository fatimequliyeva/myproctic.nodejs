const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
       await mongoose.connect("mongodb+srv://Fatosh:Fatime1930@cluster0.whz60re.mongodb.net/student_teacher")

        console.log("Mongo db qoshulub Fatoshh");
        
    } catch (error) {
        console.error("MongoDB qosulmayib ay muselman:",error.message);
        process.exit(1)
        
        
    }
}
module.exports = connectDB;
