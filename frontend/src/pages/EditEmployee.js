import { useEffect, useState } from "react";
import { getEmployeeById, updateEmployee } from "../services/employeeServices";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: ""
  });

  useEffect(() => {
    getEmployeeById(id)
      .then((res) => {
        console.log("Employee Data:", res.data);
        setEmployee(res.data); // ✅ Pura data set karo
      })
      .catch((error) => console.error("Error fetching employee:", error));
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(id, employee);
      alert("Employee updated successfully!");
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee!");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" name="name" value={employee.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" name="email" value={employee.email} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Phone:</label>
          <input type="text" name="phone" value={employee.phone} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Department:</label>
          <input type="text" name="department" value={employee.department} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Salary:</label>
          <input type="number" name="salary" value={employee.salary} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default EditEmployee;
