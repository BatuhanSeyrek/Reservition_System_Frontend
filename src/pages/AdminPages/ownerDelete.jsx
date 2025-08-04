import React from 'react';
import AdminLayout from './AdminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function OwnerDelete() {
  const admin = [{
    adminId: 1,
    adminName: 'Batuhan SEYREK',
    password: 'admin123',
    chairCount: 20,
    storeName: 'Seyrek Barbershop',
    chair: {
      openingTime: '09:00',
      closingTime: '17:00',
      islemSuresi: '30 minutes',
    },
    employee: {
      employeeName: 'Baran Batur',
    }
  }];

  return (
    <AdminLayout>
      <div className="max-w-md">
        <h2 className="text-xl font-semibold mb-4">Information Reservation</h2>
        {admin.map(admin => (
          <div key={admin.adminId} className="bg-white p-4 mb-4 border-2 border-gray-300 rounded shadow flex">
            <div className="w-3/4">
              <p><strong>Admin ID:</strong> {admin.adminId}</p>
              <p><strong>Admin Name:</strong> {admin.adminName}</p>
              <p><strong>Password:</strong> {admin.password}</p>
              <p><strong>Chair Count:</strong> {admin.chairCount}</p>
              <p><strong>Store Name:</strong> {admin.storeName}</p>
              <p><strong>Opening Time:</strong> {admin.chair.openingTime}</p>
              <p><strong>Closing Time:</strong> {admin.chair.closingTime}</p>
              <p><strong>Islem Suresi:</strong> {admin.chair.islemSuresi}</p>
              <p><strong>Employee Name:</strong> {admin.employee.employeeName}</p>
            </div>
            <div className="w-1/4 flex items-center justify-end">
              <button className="ml-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default OwnerDelete;
