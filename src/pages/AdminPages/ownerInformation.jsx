import React, { useEffect } from 'react'
import Sidebar from './ownerSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
function ownerInformation() {
  const [admin, setAdmin] = useState({
    id: '',
    adminName: '',
    chairCount: '',
    storeName: '',
    
  });
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Lütfen giriş yapın.");
      window.location.href = "ownerLogin"; // Giriş sayfasına yönlendir
    }
    axios.get('http://localhost:8080/admin/myAdmin', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setAdmin(res.data);
        console.log("Admin Bilgileri:", res.data);
      })
      .catch(err => {
        console.error("Admin bilgileri alınırken hata oluştu:", err);
      });
  }
  , []);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
       <div className="flex-1 p-6 bg-gray-100 w-full max-w-md justify-center items-center mx-auto mt-auto border-2 border-gray-400 rounded shadow my-auto ">
        
      <div class="text-center ">
        <h2 class="text-3xl font-bold text-gray-800 mb-5">Admin Information</h2>

      </div>
      <div className="bg-white rounded shadow p-1 border-2 border-gray-200 mb-4">
        <p className="text-gray-600  ">Admin ID: <strong>{admin.id}</strong></p>
      </div>
      <div className="bg-white rounded shadow p-1 border-2 border-gray-200 mb-4">
        <p className="text-gray-600 ">Admin Name: <strong>{admin.adminName}</strong></p>
      </div>
      <div className="bg-white rounded shadow p-1 border-2 border-gray-200 mb-4">
        <p className="text-gray-600 ">Store Name: <strong>{admin.storeName}</strong></p>
      </div>
       
      <div className="bg-white rounded shadow p-1 border-2 border-gray-200 mb-4">
        <p className='text-gray-600 '>Chair Count: <strong>{admin.chairCount}</strong></p>
      </div>
    </div>
        
        
        
        </div>
   
  )
}

export default ownerInformation
