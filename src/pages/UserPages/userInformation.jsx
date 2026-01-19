import React, { useEffect, useState } from 'react';
import UserLayout from './UserLayout'; // Yoluna göre ayarla
import { getData } from '../../apiService';

function KullaniciBilgileri() {

  const [kullanici, setKullanici] = useState({
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
        setKullanici(data);
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
          Kullanıcı Bilgilerim
        </h1>

        <div className="space-y-4 text-dark">
          <p>
            <span className="font-semibold text-dark">Ad Soyad  :</span>{" "}
            {kullanici.userName}
          </p>

          <p>
            <span className="font-semibold text-dark">E-posta  :</span>{" "}
            {kullanici.email}
          </p>

          <p>
            <span className="font-semibold text-dark">Telefon  :</span>{" "}
            {kullanici.phoneNumber}
          </p>

          <p>
            <span className="font-semibold text-dark">Bildirim Türü  :</span>{" "}
            {kullanici.notificationType}
          </p>
        </div>
      </div>
    </UserLayout>
  );
}

export default KullaniciBilgileri;
