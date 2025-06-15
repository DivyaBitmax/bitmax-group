const mongoose = require("mongoose");
const { MONGO_URI } = require("./config"); // Import from config.js

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(" MongoDB connected");
  } catch (error) {
    console.error(" DB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
