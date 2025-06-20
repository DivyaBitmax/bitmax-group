// models/Document.js
const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  type: {
    type: String,
    enum: ["Offer Letter", "LOI", "Salary Slip", "Performance Report"],
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", documentSchema);
