import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { getData, putData } from '../../apiService';

function OwnerUpdate() {
  const [admin, setAdmin] = useState({
    id: '',
    adminName: '',
    password: '',
    storeName: '',
    phoneNumber: ''
  });

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const data = await getData('/admin/myAdmin');
        setAdmin({
          id: data.id || '',
          adminName: data.adminName || '',
          password: '', // güvenlik nedeniyle şifreyi boş bırakıyoruz
          storeName: data.storeName || '',
          phoneNumber: data.phoneNumber || ''
        });
      } catch (error) {
        console.error('Admin verisi çekilemedi:', error);
      }
    }
    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await putData('/admin/update', admin);
      alert('Bilgiler başarıyla güncellendi.');

      const data = await getData('/admin/myAdmin');
      setAdmin({
        id: data.id || '',
        adminName: data.adminName || '',
        password: '',
        storeName: data.storeName || '',
        phoneNumber: data.phoneNumber || ''
      });
    } catch (error) {
      console.error('Güncelleme sırasında hata:', error);
      alert('Güncelleme sırasında hata oluştu.');
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded shadow border border-gray-300 mt-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Admin Revision</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
              placeholder="Şifre sizin güvenliğiniz için görünmüyor" 
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

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={admin.phoneNumber}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Update
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default OwnerUpdate;
