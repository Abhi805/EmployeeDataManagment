import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({ onSubmit, initialData }) => {
  const [employee, setEmployee] = useState(initialData || { name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) setEmployee(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employee);
    navigate("/employees");
  };

  return (
    <div className="container mt-4">
      <h2>{initialData ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" value={employee.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" name="email" value={employee.email} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success mt-3">{initialData ? "Update" : "Add"} Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
