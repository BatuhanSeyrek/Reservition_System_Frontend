import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react';
import { postData, getData } from '../../apiService';

function OwnerLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Admin login
      const response = await postData("/admin/login", { username, password });
      localStorage.setItem("token", response.token);

      // 2️⃣ myAdmin verisini çek
      const myAdmin = await getData("/admin/myAdmin");

      // 3️⃣ referenceId kontrolü
      if (!myAdmin.referenceId) {
        // Eğer boşsa reference update sayfasına yönlendir
        navigate("/ownerUpdate");
      } else {
        // Doluysa normal ana sayfaya yönlendir
        navigate("/ownerAbout");
      }
    } catch (err) {
      alert("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* Arka plan ve blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: "url('https://png.pngtree.com/background/20230616/original/pngtree-barbershop-with-several-old-and-antique-chairs-picture-image_3629466.jpg')" }}
      ></div>

      {/* Blur üzerine koyu overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg space-y-6">

        {/* User login link */}
        <div className="text-center mb-4">
          <Link to="/" className="flex items-center justify-center text-red-600 hover:underline gap-2">
            User Girişi <FontAwesomeIcon icon={faHandPointer} />
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Admin Panel Girişi</h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Admin Kullanıcı Adı</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              required 
              onChange={e => setUsername(e.target.value)} 
              value={username}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" 
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Şifre</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              onChange={e => setPassword(e.target.value)} 
              value={password}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" 
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox text-red-600" />
              <span>Beni Hatırla</span>
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200 font-semibold"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default OwnerLogin;
