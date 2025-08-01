import React, { useState, useEffect } from 'react';
import Sidebar from './ownerSidebar';
import axios from 'axios';

function OwnerUpdate() {
  const [admin, setAdmin] = useState({
    id: '',
    adminName: '',
    password: '',
    storeName: '',
  });

  // Form gönderimi
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.put('http://localhost:8080/admin/update', admin, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      alert("Bilgiler başarıyla güncellendi.");
      console.log("Güncelleme başarılı:", res.data);
      setAdmin(res.data);
    })
    .catch(err => {
      console.error("Güncelleme sırasında hata:", err);
      alert("Güncelleme sırasında hata oluştu.");
    });
  };

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
      console.error("Admin bilgileri alınırken hata oluştu:", err);
    });
  }, []);

  // Form inputlarını kontrol etmek için genel onChange handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 w-full max-w-md justify-center items-center mx-auto mt-auto border-2 border-gray-400 rounded shadow my-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Admin Revision</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="adminName" className="block text-sm font-semibold text-gray-700">Admin Name</label>
            <input
              type="text"
              id="adminName"
              name="adminName"
              value={admin.adminName}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={admin.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="storeName" className="block text-sm font-semibold text-gray-700">Store Name</label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              value={admin.storeName}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600" />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default OwnerUpdate;
