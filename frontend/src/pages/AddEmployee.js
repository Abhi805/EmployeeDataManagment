import EmployeeForm from "../components/EmployeeForm";
import { createEmployee } from "../services/employeeServices";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();

  const handleAddEmployee = async (employee) => {
    await createEmployee(employee);
    navigate("/employees");
  };

  return (
    <div className="container mt-4">
      <h2>Add New Employee</h2>
      <EmployeeForm onSubmit={handleAddEmployee} />
    </div>
  );
};

export default AddEmployee;
