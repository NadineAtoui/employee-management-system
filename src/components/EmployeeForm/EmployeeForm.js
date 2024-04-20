import React, { useState, useEffect } from 'react';
import './EmployeeForm.css';

const EmployeeForm = ({ onSubmit, employees }) => {
  const [name, setName] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [error, setError] = useState('');
  const [validSupervisors, setValidSupervisors] = useState([]);

  useEffect(() => {
    const supervisorOptions = employees.map(emp => emp.name);
    setValidSupervisors(supervisorOptions);
  }, [employees]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!name.trim()) {
      setError('Employee name cannot be empty');
      return;
    }
  
    const existingEmployee = employees.find(emp => emp.name === name.trim());
  
    if (existingEmployee) {
      if (!supervisor.trim()) {
        setError('Please select a supervisor for the existing employee');
        return;
      }
  
      if (!validSupervisors.includes(supervisor)) {
        setError('Please select a valid supervisor from the list');
        return;
      }
  
      if (checkHierarchyConstraint(existingEmployee.name, supervisor)) {
        setError('An employee cannot be the supervisor of their own supervisor');
        return;
      }
  
      const updatedEmployee = {
        ...existingEmployee,
        supervisor: supervisor.trim(),
      };
  
      onSubmit(updatedEmployee);
    } else {
      if (supervisor.trim() && !validSupervisors.includes(supervisor)) {
        setError('Please select a valid supervisor from the list');
        return;
      }
  
      const newEmployee = {
        name: name.trim(),
        supervisor: supervisor.trim() || null,
      };
  
      onSubmit(newEmployee);
    }
  
    setName('');
    setSupervisor('');
    setError('');
  };
  
  const checkHierarchyConstraint = (employeeName, supervisorName) => {
    let currentSupervisor = supervisorName;
  
    while (currentSupervisor) {
      if (currentSupervisor === employeeName) {
        return true; 
      }
  
      const supervisorEmployee = employees.find(emp => emp.name === currentSupervisor);
      if (!supervisorEmployee) {
        break; 
      }
  
      currentSupervisor = supervisorEmployee.supervisor;
    }
  
    return false; 
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
          submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
