import React from 'react'
import Sidebar from './ownerSidebar';
import { Link } from 'react-router-dom';
function adminInformation() {
    const admin = {
        adminId: 1,
        adminName: 'Admin Name',
        password: 'admin123',
        chairCount: 20,
        storeName: 'Store Name',
        chair:{
            openingTime: '09:00 AM',
            closingTime: '05:00 PM',
            islemSuresi: '30 minutes',
        },
        employee: {
            employeeName: 'Employee Name',
        }
    };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-70">
        <h2 className="text-xl font-semibold mb-4">Admin Information</h2>
        <div className="bg-white p-4 mb-4 border-2 border-black-200 rounded shadow flex text-lg w-2/5">
          <div className="w-3/4">
            <p>
              <strong>Admin ID:</strong> {admin.adminId}
            </p>
            <p>
              <strong>Admin Name:</strong> {admin.adminName}
            </p>
            <p>
              <strong>Password:</strong> {admin.password}
            </p>
            <p>
              <strong>Chair Count:</strong> {admin.chairCount}
            </p>
            <p>
              <strong>Store Name:</strong> {admin.storeName}
            </p>
            <p>
              <strong>Opening Time:</strong> {admin.chair.openingTime}
            </p>
            <p>
              <strong>Closing Time:</strong> {admin.chair.closingTime}
            </p>
            <p>
              <strong>Islem Suresi:</strong> {admin.chair.islemSuresi}
            </p>
            <p>
              <strong>Employee Name:</strong> {admin.employee.employeeName}
            </p>
          </div>
        </div>
    </div>
    </div>
  )
}

export default adminInformation
