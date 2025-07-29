import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Sidebar from './useSidebar';
function UserHome() {
      const admins = [
    { id: 1, name: "Admin 1" },
    { id: 2, name: "Admin 2" },
    { id: 3, name: "Admin 3" },
    { id: 4, name: "Admin 4" },
    { id: 5, name: "Admin 5" },
    { id: 6, name: "Admin 6" },
    { id: 7, name: "Admin 7" },
  ];
  return (
  <div className="flex min-h-screen bg-gray-100">

     <Sidebar />

        <div className="flex-1 p-6 bg-gray-100 ml-70">
        <h1 className="text-2xl font-semibold mb-4">Admin List</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  {admins.map(admin => (
    <Link to="/adminDetails" key={admin.id}>
      <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer">
        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faUser} className="text-blue-500 text-xl" />
          <span className="font-medium text-gray-700">{admin.name}</span>
        </div>
      </div>
    </Link>
  ))}
</div>
      </div>
    </div>
  );
}

export default UserHome
