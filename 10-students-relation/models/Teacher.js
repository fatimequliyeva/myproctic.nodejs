const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  specialization: { type: String, required: true }, // məsələn: "Frontend", "Backend", "UI/UX"
  courses: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Teacher", teacherSchema);
