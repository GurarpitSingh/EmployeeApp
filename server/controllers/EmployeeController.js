//Documentation

//@desc Reuqires
const mongoose = require("mongoose");
const Employee = require("../models/Employee")

// @desc    Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.status(200).json(employees);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

// @desc    Create a new employee
exports.createEmployee = async (req, res) => {
    const employee = req.body;
    employee.department = employee.department.trim()
    employee.department = employee.department.split(/[ ,]+/)[0][0].toUpperCase() + employee.department.slice(1);
    const newEmployee = new Employee(employee);
    try {
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// @desc    Update an employee
exports.updateEmployee = async (req, res) => {
    const { id: _id } = req.params;
    const employee = req.body;
    employee.department = employee.department.trim()
    employee.department = employee.department.split(/[ ,]+/)[0][0].toUpperCase() + employee.department.slice(1);
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No employee with that id");

    const updatedEmployee = await Employee.findByIdAndUpdate(_id, { ...employee, _id });
    return res.status(200).json(updatedEmployee);
}

// @desc    Delete an employee
exports.deleteEmployee = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No employee with that id");
    try{
    await Employee.findByIdAndRemove(_id);
    return res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

}

// @desc    Filter employees
exports.allFilters = async (req, res) => {
    const { query } = req.params;
    //Getting Query from frontend and filtering accordingly
    if(query === 'A-Z' || query === 'Z-A'){
        //Query is for sorting employees by name
            try {
                const employees = await Employee.find().sort({name: query==='A-Z'? 1: -1})
                return res.status(200).json(employees);
            } catch (error) {
                return res.status(404).json({ message: error.message });
            }
        }
        else if(query === 'Frontend' || query === 'Backend'){
            //Query is for filtering employees by department
            try {
                const employees = await Employee.find({department: query})
                return res.status(200).json(employees);
            } catch (error) {
                return res.status(404).json({ message: error.message });
            }
        }
        else if(query === 'LowToHigh' || query === 'HighToLow'){
            //Query is for sorting employees by salary
            try {
                const employees = await Employee.find().sort({salary: query==='LowToHigh'? 1: -1})
                return res.status(200).json(employees);
            } catch (error) {
                return res.status(404).json({ message: error.message });
            }
        }
}

