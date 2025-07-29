import React from 'react'
import Sidebar from './ownerSidebar';
function employeeDetails() {
    const chair = [
    { chairid: 1, opningtime: "09:00 AM", closingtime: "05:00 PM", islemSüresi: "8 hours", chairName: "Chair 1", employee:{employeeName: "Employee 1"},admin:{ adminName: "Admin 1", storeName: "Store 1", chairCount: 20 }}
  ];
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-70">
        <h2 className="text-xl font-semibold mb-4">Chair Details</h2>
            {chair.map((chair) => (
              <div
                key={chair.chairid}
                className="bg-white p-4 mb-4 border-2 border-black-200 rounded shadow flex text-lg w-2/5"
              >
                <div className="w-3/4">
                  <p>
                    <strong>Chair ID:</strong> {chair.chairid}
                  </p>
                  <p>
                    <strong>Opening Time:</strong> {chair.opningtime}
                  </p>
                  <p>
                    <strong>Closing Time:</strong> {chair.closingtime}
                  </p>
                  <p>
                    <strong>Processing Time:</strong> {chair.islemSüresi}
                  </p>
                  <p>
                    <strong>Chair Name:</strong> {chair.chairName}
                  </p>
                  
                    <p>
                        <strong>Employee Name:</strong> {chair.employee.employeeName}
                    </p>
                    <p>
                        <strong>Admin Name:</strong> {chair.admin.adminName}
                    </p>
                    <p>
                        <strong>Store Name:</strong> {chair.admin.storeName}
                    </p>
                    <p>
                        <strong>Chair Count:</strong> {chair.admin.chairCount}
                    </p>
                </div>
      </div>
            ))}
        </div>
        </div>
  )
}

export default employeeDetails
