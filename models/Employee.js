const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  dob: String,
  contactNumber: String,
  alternateContact: String,
  dateOfJoining: String,
  employeeStatus: String,
  dateOfReleaving: String,
  assetsAssigned: String,
  ecn: { type: String, unique: true },
  permanentAddress: String,
  email: String,
  currentAddress: String,
  salary: String,
  dateOfResignation: String,
  tncSigned: String,
  calibrationRemark: String,
  department: String,
  designation: String,
  reportingManager: String,
  password: String, // hashed
  profileImage: String,
});

module.exports = mongoose.model("Employee", employeeSchema);