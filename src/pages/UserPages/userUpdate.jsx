import React, { useEffect, useState } from 'react';
import UserLayout from './UserLayout'; // Yoluna göre güncelle
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getData, putData } from '../../apiService'; // varsa bu şekilde içe aktar

function UserUpdate() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    email: '',
    phoneNumber: '',
    notificationType: '',
    userName: '',
    password: '',  // password state eklendi
  });

  useEffect(() => {
    const fetchUser = async () => {
    try {
       const data=await getData('/user/myUser')
          
            setUser({
              id: data.id ?? '',
              email: data.email ?? '',
              phoneNumber: data.phoneNumber ?? '',
              notificationType: data.notificationType ?? '',
              userName: data.userName ?? '',
              password: ''
            });
         
       
    } catch (err) {
      console.error("Kullanıcı bilgileri alınırken hata oluştu:", err);
    }
  };

  fetchUser();

  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    putData('/user/update', user)
      .then(async () =>{
        alert("Bilgiler başarıyla güncellendi.");
        // Güncel bilgileri tekrar çek
        const data=await getData('/user/myUser')
          
            setUser({
              id: data.id ?? '',
              email: data.email ?? '',
              phoneNumber: data.phoneNumber ?? '',
              notificationType: data.notificationType ?? '',
              userName: data.userName ?? '',
              password: ''
            });
      })
      .catch(err => {
        console.error("Güncelleme sırasında hata:", err);
        alert("Güncelleme sırasında hata oluştu.");
      });
  };

  return (
    <UserLayout>
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg mx-auto mt-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Update Your Info</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label htmlFor="userName" className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={user.userName || ''}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email || ''}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">Phone</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={user.phoneNumber || ''}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="notificationType" className="block text-sm font-semibold text-gray-700">Notification Type</label>
            <select
              id="notificationType"
              name="notificationType"
              value={user.notificationType || ''}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select...</option>
              <option value="EMAIL">Email</option>
              <option value="SMS">SMS</option>
              <option value="PUSH">Push</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password || ''}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Yeni şifre (isteğe bağlı)"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
          >
            Update
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <Link to="/" className="text-blue-600 hover:underline ml-1">
            Login here
          </Link>
        </p>
      </div>
    </UserLayout>
  );
}

export default UserUpdate;
