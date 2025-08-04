import React, { useEffect, useState } from 'react';
import Sidebar from './ownerSidebar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import {getData} from '../../apiService';
import axios from 'axios';
function EmployeeList() {

  const [employeeList, setEmployeeList] = useState([]);
 useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const data = await getData("/admin/employee/list");
      console.log("Gelen veri:", data); // bu hâlâ kalsın
      setEmployeeList(data); // ✅ direkt data, çünkü array
    } catch (error) {
      console.error("Çalışan listesi alınırken hata:", error);
    }
  };

  fetchEmployees();
}, []);


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-70">
        
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left justify-left items-left ml-0">
            Employee List
          </h1>
           <div className="mb-4 p-4 bg-white rounded-xl shadow">
          <p className="text-gray-600 text-sm">Toplam çalışan sayısı: <strong>{employeeList.length}</strong></p>
        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {employeeList.map(employee => (
            <Link to={`/employeeDetails/${employee.chairid}`} key={employee.chairid}>
            <div key={employee.chairid} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faPersonCirclePlus} className="text-blue-500 text-xl" />
                <span className="font-medium text-gray-700">{employee.employeeName}</span>
              </div>
            </div>
            </Link>
          ))}
        </div>

        </div>
      </div>
 
  )
}

export default EmployeeList
