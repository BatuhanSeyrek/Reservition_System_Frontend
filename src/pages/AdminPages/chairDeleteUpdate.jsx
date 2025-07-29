import React from 'react';
import Sidebar from './ownerSidebar';

function chairDeleteUpdate() {
  const chair = [
    { chairid: 1, opneingtime: "09:00 AM", closingtime: "05:00 PM", islemSüresi: "8 hours", chairName: "Chair 1", employee:{employeeName: "Employee 1"},admin:{ adminName: "Admin 1", storeName: "Store 1", chairCount: 20 }},
    { chairid: 2, opneingtime: "10:00 AM", closingtime: "06:00 PM", islemSüresi: "8 hours", chairName: "Chair 2", employee:{employeeName: "Employee 2"},admin:{ adminName: "Admin 2", storeName: "Store 2", chairCount: 15 }},
    { chairid: 3, opneingtime: "08:00 AM", closingtime: "04:00 PM", islemSüresi: "8 hours", chairName: "Chair 3", employee:{employeeName: "Employee 3"},admin:{ adminName: "Admin 3", storeName: "Store 3", chairCount: 25 }},
    { chairid: 4, opneingtime: "09:30 AM", closingtime: "05:30 PM", islemSüresi: "8 hours", chairName: "Chair 4", employee:{employeeName: "Employee 4"},admin:{ adminName: "Admin 4", storeName: "Store 4", chairCount: 30 }},
    { chairid: 5, opneingtime: "10:30 AM", closingtime: "06:30 PM", islemSüresi: "8 hours", chairName: "Chair 5", employee:{employeeName: "Employee 5"},admin:{ adminName: "Admin 5", storeName: "Store 5", chairCount: 10 }},
    { chairid: 6, opneingtime: "08:30 AM", closingtime: "04:30 PM", islemSüresi: "8 hours", chairName: "Chair 6", employee:{employeeName: "Employee 6"},admin:{ adminName: "Admin 6", storeName: "Store 6", chairCount: 18 }},
    { chairid: 7, opneingtime: "09:15 AM", closingtime: "05:15 PM", islemSüresi: "8 hours", chairName: "Chair 7", employee:{employeeName: "Employee 7"},admin:{ adminName: "Admin 7", storeName: "Store 7", chairCount: 22 }}
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 ml-70">
        {/* ✅ Employee ve Actions'ı yan yana almak için flex container */}
        <div className="flex gap-6">
          {/* SOL TARAF: Employee Listesi */}
          <div className="w-2/4">
            <h2 className="text-xl font-semibold mb-4">Chair Information</h2>
            {chair.map((chair) => (
              <div
                key={chair.chairid}
                className="bg-white p-4 mb-4 border-2 border-black-200 rounded shadow flex"
              >
                <div className="w-3/4">
                 <p>
                    <strong>Chair ID:</strong> {chair.chairid}
                  </p>
                  <p>
                    <strong>Opening Time:</strong> {chair.opneingtime}
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
                <div className="w-1/4 flex flex-col justify-center items-end gap-2 text-xl">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SAĞ TARAF: Actions */}
          <div className="w-2/4 p-1 bg-gray-100">
            <h2 className="text-xl font-semibold mb-4">Employee Edit and Create</h2>
            <div className="bg-white p-4 rounded shadow">
                <form className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Chair Name</label>
                        <input type="text" className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter chair name"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Opening Time</label>
                        <input type="time" className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter opening time" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Closing Time</label>
                        <input type="time" className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter closing time"/>  
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Processing Time</label>
                        <input type="time" className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter processing time" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                        <input type="text" className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter employee name"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Admin Name</label>
                        <input type="text" className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter admin name"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Store Name</label>
                        <input type="text" className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter store name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Chair Count</label>
                        <input type="number" className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter chair count"/>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="w-1/2">
                    <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                    Create Employee
                    </button>
                    </div>
                    <div className="w-1/2">
                    <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                    Update Employee
                    </button>
                    </div>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default chairDeleteUpdate;
