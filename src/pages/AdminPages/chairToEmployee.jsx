import React from 'react'
import Sidebar from './ownerSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair,faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function ChairToEmployee() {
    const chair = [
    { chairid: 1, opneingtime: "09:00 AM", closingtime: "05:00 PM", islemSüresi: "8 hours", chairName: "Chair 1", employee:{employeeName: "Employee 1"},admin:{ adminName: "Admin 1", storeName: "Store 1", chairCount: 20 }},
    { chairid: 2, opneingtime: "10:00 AM", closingtime: "06:00 PM", islemSüresi: "8 hours", chairName: "Chair 2", employee:{employeeName: "Employee 2"},admin:{ adminName: "Admin 2", storeName: "Store 2", chairCount: 15 }},
    { chairid: 3, opneingtime: "08:00 AM", closingtime: "04:00 PM", islemSüresi: "8 hours", chairName: "Chair 3", employee:{employeeName: "Employee 3"},admin:{ adminName: "Admin 3", storeName: "Store 3", chairCount: 25 }},
    { chairid: 4, opneingtime: "09:30 AM", closingtime: "05:30 PM", islemSüresi: "8 hours", chairName: "Chair 4", employee:{employeeName: "Employee 4"},admin:{ adminName: "Admin 4", storeName: "Store 4", chairCount: 30 }},
    { chairid: 5, opneingtime: "10:30 AM", closingtime: "06:30 PM", islemSüresi: "8 hours", chairName: "Chair 5", employee:{employeeName: "Employee 5"},admin:{ adminName: "Admin 5", storeName: "Store 5", chairCount: 10 }},
    { chairid: 6, opneingtime: "08:30 AM", closingtime: "04:30 PM", islemSüresi: "8 hours", chairName: "Chair 6", employee:{employeeName: "Employee 6"},admin:{ adminName: "Admin 6", storeName: "Store 6", chairCount: 18 }},
    { chairid: 7, opneingtime: "09:15 AM", closingtime: "05:15 PM", islemSüresi: "8 hours", chairName: "Chair 7", employee:{employeeName: "Employee 7"},admin:{ adminName: "Admin 7", storeName: "Store 7", chairCount: 22 }},
    { chairid: 8, opneingtime: "09:45 AM", closingtime: "05:45 PM", islemSüresi: "8 hours", chairName: "Chair 8", employee:{employeeName: "Employee 8"},admin:{ adminName: "Admin 8", storeName: "Store 8", chairCount: 12 }}
  ];
  const employee= [
    { employeename: "Employee 1", chairid: 1 },
    { employeename: "Employee 2", chairid: 2 },
    { employeename: "Employee 3", chairid: 3 },
    { employeename: "Employee 4", chairid: 4 },
    { employeename: "Employee 5", chairid: 5 },
    { employeename: "Employee 6", chairid: 6 },
    { employeename: "Employee 7", chairid: 7 },
    { employeename: "Employee 8", chairid: 8 }
  ];
  return (
    <>
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
        <div className='flex-1 p-6 flex flex-col'>
        <div className='flex flex-row gap-6'>
      <div className="flex-1 p-6 bg-gray-100 ml-70 w-1/2 ">
        {/* Sola yaslı başlık */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left">
          Chair List
        </h1>
        <div className="mb-4 p-4 bg-white rounded-xl shadow">
          <p className="text-gray-600 text-sm">Toplam sandelye sayısı: <strong>{chair.length}</strong></p>
        </div>

        {/* Grid yapısı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {chair.map(chair => (
            
              <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faChair} className="text-blue-500 text-xl" />
                  <span className="font-medium text-gray-700">{chair.chairName}</span>
                </div>
              </div>

          ))}
        </div>
        </div>
        <div className="flex-1 p-6 bg-gray-100 ml-70 w-1/2 ">
        
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left justify-left items-left ml-0">
            Employee List
          </h1>
           <div className="mb-4 p-4 bg-white rounded-xl shadow">
          <p className="text-gray-600 text-sm">Toplam çalışan sayısı: <strong>{employee.length}</strong></p>
        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {employee.map(employee => (
           
            <div key={employee.chairid} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faPersonCirclePlus} className="text-blue-500 text-xl" />
                <span className="font-medium text-gray-700">{employee.employeename}</span>
              </div>
            </div>
          ))}
        </div>

        </div>
        </div>
        <button className='bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition '>Chair to employee</button>
        </div>
</div>
          
        </>

  )
}

export default ChairToEmployee
