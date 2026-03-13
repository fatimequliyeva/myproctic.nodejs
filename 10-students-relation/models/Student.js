const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0 },
    email: { type: String, unique: true, required: true, lowercase: true },
    courses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course" } // kurslara reference
    ]
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Student", studentSchema);
