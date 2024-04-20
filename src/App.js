import React, { useState } from 'react';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import EmployeeList from './components/EmployeeList/EmployeeList'
import DisplayEmployee from './components/DisplayEmployee/DisplayEmployee';
import jsonData from './employees.json'; // This could be considered as data coming from an api
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState(jsonData.employees);
  const [message, setMessage] = useState(null);

  const handleAddEmployee = (newEmployee) => {
    const existingEmployeeIndex = employees.findIndex(emp => emp.name === newEmployee.name);
  
    if (existingEmployeeIndex !== -1) {
      const updatedEmployees = [...employees];
      updatedEmployees[existingEmployeeIndex] = newEmployee;
      setEmployees(updatedEmployees);
      setMessage(`Employee "${newEmployee.name}" updated successfully.`);
    } else {
      setEmployees([...employees, newEmployee]);
      setMessage(`Employee "${newEmployee.name}" added successfully.`);
    }
  };

  const handleDeleteEmployee = (employeeToDelete) => {
    const supervisorName = employeeToDelete.name;
    const hasDirectReports = employees.some(emp => emp.supervisor === supervisorName);

    const updatedEmployees = employees.map(employee => {
      if (employee.supervisor === supervisorName) {
        if (!hasDirectReports) {
          return { ...employee, supervisor: null }; 
        } else {
          const supervisorOfSupervisor = employees.find(emp => emp.name === supervisorName).supervisor;
          return { ...employee, supervisor: supervisorOfSupervisor };
        }
      }
      return employee;
    });

    const filteredEmployees = updatedEmployees.filter(emp => emp.name !== supervisorName);

    setEmployees(filteredEmployees);
    setMessage(`Employee "${supervisorName}" deleted successfully.`);
  };

  return (
    <div className='Container'>
      <div className='sub-container'>
        <h2>Employee Management System</h2>
        <EmployeeForm onSubmit={handleAddEmployee} employees={employees} />
        {message && <div className={message.includes('error') ? 'error-message' : 'success-message'}>{message}</div>}
      </div>
      <div className='sub-container'>
        <EmployeeList employees={employees} onDelete={handleDeleteEmployee} />
        <DisplayEmployee employees={employees} />
      </div>

    </div>
  );
};

export default App;
