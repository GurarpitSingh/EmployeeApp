const mongoose = require("mongoose");

//@desc Employee Schema
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

//@desc Employee Model registration and export
const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports=Employee;