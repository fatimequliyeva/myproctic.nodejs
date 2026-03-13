const mongoose = require("mongoose");

const connectDB = async () => {
  try {
   await mongoose.connect(
 "mongodb+srv://Fatime:Fatime1930@cluster0.whz60re.mongodb.net/test"
);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;