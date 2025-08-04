import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import UserLayout from './UserLayout'; // Kendi dizin yapına göre düzenle
import axios from 'axios';

function AllStores() {
  const [adminList, setAdminList] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert("Lütfen giriş yapın.");
      window.location.href = "/ownerLogin";
      return;
    }

    axios.get('http://localhost:8080/admin/list', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setAdminList(res.data);
      })
      .catch(err => {
        console.error("Admin listesi alınırken hata oluştu:", err);
      });
  }, []);

  return (
    <UserLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Owner List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {adminList.map((admin) => (
            <Link to="/reservation" key={admin.id}>
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
