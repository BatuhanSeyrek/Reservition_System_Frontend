import React from 'react';
import Sidebar from './ownerSidebar';

function employeeDeleteUpdate() {
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
    {
      employeeId: 2,
      employeeName: 'Employee Name 2',
      admin: {
        adminName: 'Admin 2',
        chairCount: 15,
        storeName: 'Store 2',
      },
      chair: {
        openingTime: '10:00 AM',
        closingTime: '06:00 PM',
        islemSuresi: '20 minutes',
      },
    },
    {
        employeeId: 3,
        employeeName: 'Employee Name 3',
        admin: {
            adminName: 'Admin 3',
            chairCount: 25,
            storeName: 'Store 3',
        },
        chair: {
            openingTime: '08:00 AM',
            closingTime: '04:00 PM',
            islemSuresi: '15 minutes',
        },
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 ml-70">
        {/* ✅ Employee ve Actions'ı yan yana almak için flex container */}
        <div className="flex gap-6">
          {/* SOL TARAF: Employee Listesi */}
          <div className="w-2/4">
            <h2 className="text-xl font-semibold mb-4">Employee Information</h2>
            {employee.map((employee) => (
              <div
                key={employee.employeeId}
                className="bg-white p-4 mb-4 border-2 border-black-200 rounded shadow flex"
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
                    <div>
                    <label className="block text-sm font-semibold text-gray-700">Employee Name</label>
                    <input
                        type="text"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter employee name"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-semibold text-gray-700">Admin Name</label>
                    <input
                        type="text"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter admin name"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-semibold text-gray-700">Chair Count</label>
                    <input
                        type="number"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter chair count"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-semibold text-gray-700">Store Name</label>
                    <input
                        type="text"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter store name"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-semibold text-gray-700">Opening Time</label>
                    <input
                        type="time"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter opening time"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-semibold text-gray-700">Closing Time</label>
                    <input
                        type="time"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter closing time"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-semibold text-gray-700">Islem Suresi</label>
                    <input
                        type="text"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter islem suresi"
                    />
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

export default employeeDeleteUpdate;
