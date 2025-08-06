import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from './UserLayout';
import axios from 'axios';
import { getData } from '../../apiService';

function AllStores() {
  const [adminList, setAdminList] = useState([]);
  useEffect(() => {
     const fetchAdmin = async () => {
     try {
       const data = await getData('/admin/list')
       setAdminList(data);
     } catch (err) {
       console.error("Kullanıcı bilgileri alınırken hata oluştu:", err);
     }
   };
 
   fetchAdmin();
 
   }, []);
  return (
    <UserLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Owner List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {adminList.map((admin) => (
            <Link to={`/reservation/${admin.id}`} key={admin.id}>
              <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faPersonCirclePlus} className="text-blue-500 text-xl" />
                  <span className="font-medium text-gray-700">{admin.adminName}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}

export default AllStores;
