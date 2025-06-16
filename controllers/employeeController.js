const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config/config");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { ecn, password } = req.body;
  try {
    const user = await Employee.findOne({ ecn });
    if (!user) return res.status(404).json({ msg: "ECN not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    const { password: _, ...profile } = user._doc;
    res.json({ token, profile });
  } catch (err) {
    res.status(500).json({ msg: "Login error" });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({ ...rest, password: hashedPassword });
    await employee.save();
    res.status(201).json({ msg: "Employee created" });
  } catch (err) {
    res.status(400).json({ msg: "Create failed", error: err.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  const data = await Employee.find().select("-password");
  res.json(data);
};

exports.getEmployeeById = async (req, res) => {
  const emp = await Employee.findById(req.params.id).select("-password");
  if (!emp) return res.status(404).json({ msg: "Not found" });
  res.json(emp);
};

exports.updateEmployee = async (req, res) => {
  const update = { ...req.body };
  delete update.password;
  const emp = await Employee.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!emp) return res.status(404).json({ msg: "Update failed" });
  res.json(emp);
};

exports.deleteEmployee = async (req, res) => {
  const emp = await Employee.findByIdAndDelete(req.params.id);
  if (!emp) return res.status(404).json({ msg: "Delete failed" });
  res.json({ msg: "Deleted" });
};

// In employeeController.js

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const employeeId = req.params.id;

  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ msg: "New passwords do not match" });
    }

    const user = await Employee.findById(employeeId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect current password" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};