const Teacher = require("../models/Teacher");

// CREATE
exports.createTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("courses");
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate("courses");
    if (!teacher) return res.status(404).json({ error: "teacher not found" });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("courses");
    if (!teacher) return res.status(404).json({ error: "teacher not found" });
    res.json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ error: "teacher not found" });
    res.json({ message: "teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
