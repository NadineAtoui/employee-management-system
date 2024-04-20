import React, { useState, useEffect } from 'react';
import './EmployeeForm.css';

const EmployeeForm = ({ onSubmit, employees }) => {
  const [name, setName] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [error, setError] = useState('');
  const [validSupervisors, setValidSupervisors] = useState([]);

  // Update valid supervisors whenever employees list changes
  useEffect(() => {
    const supervisorOptions = employees.map(emp => emp.name);
    setValidSupervisors(supervisorOptions);
  }, [employees]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate form inputs
    if (!name.trim()) {
      setError('Employee name cannot be empty');
      return;
    }
  
    const existingEmployee = employees.find(emp => emp.name === name.trim());
  
    if (existingEmployee) {
      // Assign supervisor to an existing employee
      if (!supervisor.trim()) {
        setError('Please select a supervisor for the existing employee');
        return;
      }
  
      if (!validSupervisors.includes(supervisor)) {
        setError('Please select a valid supervisor from the list');
        return;
      }
  
      // Check for hierarchy constraints
      if (checkHierarchyConstraint(existingEmployee.name, supervisor)) {
        setError('An employee cannot be the supervisor of their own supervisor');
        return;
      }
  
      // Prepare updated employee object
      const updatedEmployee = {
        ...existingEmployee,
        supervisor: supervisor.trim(),
      };
  
      // Submit updated employee data
      onSubmit(updatedEmployee);
    } else {
      // Add new employee
      if (supervisor.trim() && !validSupervisors.includes(supervisor)) {
        setError('Please select a valid supervisor from the list');
        return;
      }
  
      // Prepare new employee object
      const newEmployee = {
        name: name.trim(),
        supervisor: supervisor.trim() || null,
      };
  
      // Submit new employee data
      onSubmit(newEmployee);
    }
  
    // Clear form fields and reset error state
    setName('');
    setSupervisor('');
    setError('');
  };
  
  // Helper function to check hierarchy constraints
  const checkHierarchyConstraint = (employeeName, supervisorName) => {
    let currentSupervisor = supervisorName;
  
    // Traverse up the hierarchy starting from the selected supervisor
    while (currentSupervisor) {
      if (currentSupervisor === employeeName) {
        return true; // Hierarchy constraint violated
      }
  
      // Find the supervisor of the current supervisor
      const supervisorEmployee = employees.find(emp => emp.name === currentSupervisor);
      if (!supervisorEmployee) {
        break; // Supervisor not found (shouldn't happen in valid data)
      }
  
      currentSupervisor = supervisorEmployee.supervisor;
    }
  
    return false; // Hierarchy constraint satisfied
  };

  return (
    <div className="form-container">
      {/* <h2>{existingEmployee ? 'Assign Supervisor' : 'Add New Employee'}</h2> */}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Employee Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Supervisor:
          <select
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
          >
            <option value="">None</option>
            {validSupervisors.map((supervisorName) => (
              <option key={supervisorName} value={supervisorName}>
                {supervisorName}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">
          {/* {existingEmployee ? 'Assign Supervisor' : 'Add Employee'} */}
          submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
