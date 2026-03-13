const Student = require("../models/Student");

// CREATE
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL )
exports.getStudents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0; 
    const students = await Student.find()
      .populate({
        path: "courses",
        populate: { path: "teacher" }
      })
      .limit(limit);

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate({
      path: "courses",
      populate: { path: "teacher" }
    });
    if (!student) {
      return res.status(404).json({ error: "student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate({
      path: "courses",
      populate: { path: "teacher" }
    });
    if (!student) {
      return res.status(404).json({ error: "student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "student not found" });
    }
    res.json({ message: "student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
