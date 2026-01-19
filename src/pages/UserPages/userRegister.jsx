import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../../apiService';

function UserRegister() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    notificationType: "",
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postData("/user/register", formData);
      alert("Kayıt başarılı!");
      navigate("/");
    } catch (err) {
      alert("Hata: " + err.response?.data || err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* Arka plan ve blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: "url('https://png.pngtree.com/background/20230616/original/pngtree-barbershop-with-several-old-and-antique-chairs-picture-image_3629466.jpg')" }} // buraya kendi berber resmini ekle
      ></div>

      {/* Blur üzerine koyu overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg space-y-6">

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Kullanıcı Kaydı</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label htmlFor="userName" className="block text-sm font-semibold text-gray-700">İsim</label>
            <input type="text" id="userName" name="userName" required 
              onChange={handleChange} value={formData.userName}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input type="email" id="email" name="email" required 
              onChange={handleChange} value={formData.email}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">Telefon</label>
            <input type="text" id="phoneNumber" name="phoneNumber" required 
              onChange={handleChange} value={formData.phoneNumber}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
          </div>

          <div>
            <label htmlFor="notificationType" className="block text-sm font-semibold text-gray-700">Bildirim Türü</label>
            <select id="notificationType" name="notificationType" required 
              onChange={handleChange} value={formData.notificationType}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400">
              <option value="">Seçiniz...</option>
              <option value="MAIL">Email</option>
              <option value="SMS">SMS</option>
              <option value="PUSH">Push</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Şifre</label>
            <input type="password" id="password" name="password" required 
              onChange={handleChange} value={formData.password}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
          </div>

          <button type="submit" 
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200 font-semibold">
            Kayıt Ol
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Zaten hesabınız var mı?{" "}
          <Link to="/userLogin" className="text-red-600 hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserRegister;
