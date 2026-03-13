const express = require("express");
const connectDB = require("./db");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const teacherRoutes = require("./routes/teacherRoutes");



const app = express();
const PORT = 3000;

app.use(express.json());


// Routes
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/teachers", teacherRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
connectDB();
