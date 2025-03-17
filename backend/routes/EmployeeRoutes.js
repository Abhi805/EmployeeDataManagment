const express = require('express');
const { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/EmployeeController');

const router = express.Router();

// ✅ Create Employee
router.post('/add', createEmployee);

// ✅ Get All Employees
router.get('/all', getAllEmployees);

// ✅ Get Single Employee
router.get('/:id', getEmployeeById);

// ✅ Update Employee
router.put('/update/:id', updateEmployee);

// ✅ Delete Employee
router.delete('/delete/:id', deleteEmployee);

module.exports = router;



