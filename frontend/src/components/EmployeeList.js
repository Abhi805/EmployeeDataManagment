import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeServices";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    getEmployees()
      .then((res) => {
        console.log("API Response:", res);
        if (Array.isArray(res.data)) {
          setEmployees(res.data);
        } else {
          console.error("Expected array but got:", res);
          setEmployees([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteEmployee(id);
        alert("Employee deleted successfully!");
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee!");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2>All Employees</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(emp._id)}>
                    Delete
                  </button>
                  &nbsp;&nbsp;
                  <button className="btn btn-primary me-2" onClick={() => handleEdit(emp._id)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No employees found!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
