import React from 'react'
import Sidebar from './ownerSidebar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
function adminhome() {
  const employee= [
    { employeename: "Employee 1", chairid: 1 },
    { employeename: "Employee 2", chairid: 2 },
    { employeename: "Employee 3", chairid: 3 },
    { employeename: "Employee 4", chairid: 4 },
    { employeename: "Employee 5", chairid: 5 },
    { employeename: "Employee 6", chairid: 6 },
    { employeename: "Employee 7", chairid: 7 },
    { employeename: "Employee 8", chairid: 8 },
    { employeename: "Employee 9", chairid: 9 },
    { employeename: "Employee 10", chairid: 10 },
    { employeename: "Employee 11", chairid: 11 },
    { employeename: "Employee 12", chairid: 12 },
    { employeename: "Employee 13", chairid: 13 },
    { employeename: "Employee 14", chairid: 14 },
    { employeename: "Employee 15", chairid: 15 },
    { employeename: "Employee 16", chairid: 16 },
    { employeename: "Employee 17", chairid: 17 },
    { employeename: "Employee 18", chairid: 18 },
    { employeename: "Employee 19", chairid: 19 },
    { employeename: "Employee 20", chairid: 20 }
  ];
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-70">
        
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left justify-left items-left ml-0">
            Employee List
          </h1>
           <div className="mb-4 p-4 bg-white rounded-xl shadow">
          <p className="text-gray-600 text-sm">Toplam çalışan sayısı: <strong>{employee.length}</strong></p>
        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {employee.map(employee => (
            <Link to="/employeeDetails" key={employee.chairid}>
            <div key={employee.chairid} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faPersonCirclePlus} className="text-blue-500 text-xl" />
                <span className="font-medium text-gray-700">{employee.employeename}</span>
              </div>
            </div>
            </Link>
          ))}
        </div>

        </div>
      </div>
 
  )
}

export default adminhome
