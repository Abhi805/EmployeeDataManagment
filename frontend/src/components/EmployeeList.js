import { useEffect, useState } from "react";
import { getEmployees,deleteEmployee  } from "../services/employeeServices";
import { useNavigate } from "react-router-dom"; // ✅ Navigation के लिए
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate(); // ✅ Use for Redirecting

  useEffect(() => {
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
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteEmployee(id);
        alert("Employee deleted successfully!");
        getEmployees(); // ✅ Delete के बाद लिस्ट अपडेट करने के लिए API दोबारा कॉल करो
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee!");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/employees/edit/${id}`); // ✅ Redirect to Edit Page
  };



  return (
    <div className="container mt-4">
      <h2>All Employees</h2>
      <table className="table">
        <thead><tr><th>Name</th><th>Email</th><th>Actions</th></tr></thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
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
            <tr><td colSpan="3">No employees found!</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
