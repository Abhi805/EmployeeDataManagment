const EmployeeModel = require('../models/EmployeeModel');

// ✅ Add Employee
const createEmployee = async (req, res) => {
    try {
        const { name, email, phone, department, salary } = req.body;

        if (!name || !email || !phone || !department || !salary) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        const employee = new EmployeeModel({
            name, email, phone, department, salary
        });

        await employee.save();
        res.status(201).json({
            success: true,
            message: 'Employee created successfully',
            data: employee
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// ✅ Get All Employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await EmployeeModel.find();
        res.status(200).json({
            success: true,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// ✅ Get Single Employee
const getEmployeeById = async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({ success: true, data: employee });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// ✅ Update Employee
const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({ success: true, message: "Employee updated successfully", data: updatedEmployee });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// ✅ Delete Employee
const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({ success: true, message: "Employee deleted successfully" });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

module.exports = { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee };
