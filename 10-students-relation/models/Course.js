const mongoose=require("mongoose");
const courseSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:String,
      teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" } // kursun müəllimi
}, { timestamps: true 
});
module.exports = mongoose.model("Course", courseSchema);