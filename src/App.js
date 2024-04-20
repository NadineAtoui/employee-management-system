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
    // Check if employee name already exists
    const existingEmployeeIndex = employees.findIndex(emp => emp.name === newEmployee.name);
  
    if (existingEmployeeIndex !== -1) {
      // Employee with the same name already exists, replace it
      const updatedEmployees = [...employees];
      updatedEmployees[existingEmployeeIndex] = newEmployee;
      setEmployees(updatedEmployees);
      setMessage(`Employee "${newEmployee.name}" updated successfully.`);
    } else {
      // Add new employee to the list
      setEmployees([...employees, newEmployee]);
      setMessage(`Employee "${newEmployee.name}" added successfully.`);
    }
  };

  const handleDeleteEmployee = (employeeToDelete) => {
    const supervisorName = employeeToDelete.name;

    // Check if the deleted employee is a supervisor of other employees
    const hasDirectReports = employees.some(emp => emp.supervisor === supervisorName);

    // Update the employees array based on the supervisor deletion
    const updatedEmployees = employees.map(employee => {
      if (employee.supervisor === supervisorName) {
        if (!hasDirectReports) {
          // If the deleted supervisor has no supervisor themselves
          return { ...employee, supervisor: null }; // Set supervisor to null
        } else {
          // If the deleted supervisor has a supervisor
          const supervisorOfSupervisor = employees.find(emp => emp.name === supervisorName).supervisor;
          return { ...employee, supervisor: supervisorOfSupervisor };
        }
      }
      return employee;
    });

    // Remove the employee to be deleted from the updated list
    const filteredEmployees = updatedEmployees.filter(emp => emp.name !== supervisorName);

    // Update the state with the modified employees array
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



// To run this project you need to clone and run `npm start`

// When deleting a supervisor that has subordinates, this supervisor's supervisor will become the 
// subordinate's supervisor. else if the supervisor has no supervisor then the employees will have null as a supervisor

// I would preferable use css frameworks or libraries like tailwind or material-ui 

// This form will allow you to add a new employee and assign a supervisor to it
// it will also allow you to assign a supervisor to an already existing employee

