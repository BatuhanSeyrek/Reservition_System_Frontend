import React, { useEffect, useState } from 'react';
import UserLayout from './UserLayout'; // Yoluna göre ayarla
import axios from 'axios';
import { getData } from '../../apiService';

function UserInformation() {
  
  const [user, setUser] = useState({
    email: "",
    userName: "",
    phoneNumber: "",
    notificationType: "",
    password: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
    try {
      const data = await getData('/user/myUser');
      setUser(data);
    } catch (err) {
      console.error("Kullanıcı bilgileri alınırken hata oluştu:", err);
    }
  };

  fetchUser();

  }, []);

  return (
    <UserLayout>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 w-full max-w-lg mx-auto mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Information
        </h1>

        <div className="space-y-4 text-gray-700">
          <p><span className="font-semibold text-gray-600">Name:</span> {user.userName}</p>
          <p><span className="font-semibold text-gray-600">Email:</span> {user.email}</p>
          <p><span className="font-semibold text-gray-600">Phone:</span> {user.phoneNumber}</p>
          <p><span className="font-semibold text-gray-600">Notification:</span> {user.notificationType}</p>
          <p><span className="font-semibold text-gray-600">Password:</span> {user.password}</p>
        </div>
      </div>
    </UserLayout>
  );
}

export default UserInformation;
