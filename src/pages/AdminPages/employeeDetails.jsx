import React from 'react'
import Sidebar from './ownerSidebar';
function employeeDetails() {
    const employee = [
    {
      employeeId: 1,
      employeeName: 'Employee Name',
      admin: {
        adminName: 'Admin Name',
        chairCount: 20,
        storeName: 'Store Name',
      },
      chair: {
        openingTime: '09:00 AM',
        closingTime: '05:00 PM',
        islemSuresi: '30 minutes',
      },
    },
   
  ];
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-70">
        <h2 className="text-xl font-semibold mb-4">Employee Details</h2>
            {employee.map((employee) => (
              <div
                key={employee.employeeId}
                className="bg-white p-4 mb-4 border-2 border-black-200 rounded shadow flex text-lg w-2/5"
              >
                <div className="w-3/4">
                  <p>
                    <strong>Employee ID:</strong> {employee.employeeId}
                  </p>
                  <p>
                    <strong>Employee Name:</strong> {employee.employeeName}
                  </p>
                  <p>
                    <strong>Admin Name:</strong> {employee.admin.adminName}
                  </p>
                  <p>
                    <strong>Chair Count:</strong> {employee.admin.chairCount}
                  </p>
                  <p>
                    <strong>Store Name:</strong> {employee.admin.storeName}
                  </p>
                  <p>
                    <strong>Opening Time:</strong> {employee.chair.openingTime}
                  </p>
                  <p>
                    <strong>Closing Time:</strong> {employee.chair.closingTime}
                  </p>
                  <p>
                    <strong>Islem Suresi:</strong> {employee.chair.islemSuresi}
                  </p>
                </div>
      </div>
            ))}
        </div>
        </div>
  )
}

export default employeeDetails
