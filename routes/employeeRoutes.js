const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/employeeController");

router.post("/login", ctrl.login);
router.post("/create", ctrl.createEmployee);
router.get("/", ctrl.getAllEmployees);
router.get("/:id", ctrl.getEmployeeById);
router.put("/:id", ctrl.updateEmployee);
router.delete("/:id", ctrl.deleteEmployee);

module.exports = router;