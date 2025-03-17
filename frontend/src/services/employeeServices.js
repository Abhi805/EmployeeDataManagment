import axios from "axios";

const API_URL = "http://localhost:4000/api/employees";

// ✅ Get All Employees
export const getEmployees = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

// ✅ Get Employee by ID
export const getEmployeeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

//✅ Add New Employee
// export const createEmployee = async (employee) => {
//   await axios.post(`${API_URL}/add`, employee);
// };
export const createEmployee = async (employeeData) => {
  try {
      const res = await fetch("http://localhost:4000/api/employees/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
      });

      const data = await res.json();
      return data;
  } catch (error) {
      console.error("Error creating employee:", error);
      return { success: false, message: "Server Error" };
  }
};



// ✅ Update Employee
export const updateEmployee = async (id, employee) => {
  await axios.put(`${API_URL}/update/${id}`, employee);
};

// ✅ Delete Employee
export const deleteEmployee = async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
};
