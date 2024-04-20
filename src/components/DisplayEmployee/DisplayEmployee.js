

import React from 'react';
import './DisplayEmployee.css'; 

const DisplayEmployee = ({ employees }) => {
  const renderEmployeeNode = (employee) => {
    const directReports = employees.filter(emp => emp.supervisor === employee.name);

    return (
      <>
        
        <div key={employee.name} className="employee-node">
          
          <div className="employee-details">
            <span className="employee-name">{employee.name}</span>
            <span className="employee-position">{employee.position}</span>
          </div>
          {directReports.length > 0 && (
            <div className="direct-reports">
              {directReports.map(report => renderEmployeeNode(report))}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="employee-tree">
      <h2>Heirarchy View</h2>
      {employees.map(employee => {
        if (!employee.supervisor) {
          return renderEmployeeNode(employee); 
        }
        return null;
      })}
    </div>
  );
};

export default DisplayEmployee;

