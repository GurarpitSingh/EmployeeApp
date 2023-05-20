const express = require("express");
const router = express.Router();


const Employee = require("../models/Employee");
const {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    allFilters
} = require("../controllers/EmployeeController");

// Routes to get all employees, create an employee, update an employee, delete an employee, and filter employees by name, department, and salary
router.get("/", getEmployees);
router.post("/create", createEmployee);
router.post("/update/:id", updateEmployee);
router.post("/delete/:id", deleteEmployee);
router.get("/filter/:query", allFilters);


module.exports = router;