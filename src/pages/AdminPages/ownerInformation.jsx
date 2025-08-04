import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';

function OwnerInformation() {
  const [admin, setAdmin] = useState({
    adminId: '',
    adminName: '',
    password: '',
    chairCount: '',
    storeName: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Lütfen giriş yapın.");
      window.location.href = "/ownerLogin";
    }

    axios.get('http://localhost:8080/admin/myAdmin', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setAdmin(res.data);
      })
      .catch(err => {
        console.error("Hata:", err);
      });
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-md">
        <h2 className="text-xl font-semibold mb-4">Admin Information</h2>
        <div className="bg-white p-4 mb-4 border-2 border-gray-200 rounded shadow">
          <p><strong>Admin Name:</strong> {admin.adminName}</p>
          <p><strong>Chair Count:</strong> {admin.chairCount}</p>
          <p><strong>Store Name:</strong> {admin.storeName}</p>
          
        </div>
      </div>
    </AdminLayout>
  );
}

export default OwnerInformation;
