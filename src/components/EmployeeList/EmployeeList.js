import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './EmployeeList.css';

const EmployeeList = ({ employees, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteClick = (employee) => {
    onDelete(employee);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <TransitionGroup className="employee-list">
        {filteredEmployees.map((employee) => (
          <CSSTransition key={employee.name} timeout={300} classNames="fade">
            <li className="employee-item">
              <span className="employee-name">{employee.name}</span>
              <span className="employee-supervisor">
                Supervisor: {employee.supervisor || 'None'}
              </span>
              <button
                className="delete-button"
                onClick={() => handleDeleteClick(employee)}
              >
                Delete
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default EmployeeList;
