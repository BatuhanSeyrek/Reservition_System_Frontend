import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Sidebar from './useSidebar'
import { Link } from 'react-router-dom';

function AdminDetails() {
  const adminDetails = [
    { adminid: 1, adminName: "adminName 1" },
    { adminid: 2, adminName: "adminName 2" },
    { adminid: 3, adminName: "adminName 3" },
    { adminid: 4, adminName: "adminName 4" },
    { adminid: 5, adminName: "adminName 5" },
    { adminid: 6, adminName: "adminName 6" },
    { adminid: 7, adminName: "adminName 7" },
    { adminid: 8, adminName: "adminName 8" },
    { adminid: 9, adminName: "adminName 9" },
    { adminid: 10, adminName: "adminName 10" },
    { adminid: 11, adminName: "adminName 11" },
    { adminid: 12, adminName: "adminName 12" },
    { adminid: 13, adminName: "adminName 13" },
    { adminid: 14, adminName: "adminName 14" },
    { adminid: 15, adminName: "adminName 15" },
    { adminid: 16, adminName: "adminName 16" },
    { adminid: 17, adminName: "adminName 17" },
    { adminid: 18, adminName: "adminName 18" },
    { adminid: 19, adminName: "adminName 19" },
    { adminid: 20, adminName: "adminName 20" }
  ];
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-70">
        <h1 className="text-2xl font-semibold mb-4">Owner List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {adminDetails.map(admin => (
            <Link to="/reservation" key={admin.adminid}>
            <div key={admin.adminid} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faPersonCirclePlus} className="text-blue-500 text-xl" />
                <span className="font-medium text-gray-700">{admin.adminName}</span>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDetails