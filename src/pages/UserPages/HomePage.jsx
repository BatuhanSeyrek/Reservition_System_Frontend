import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from '@fortawesome/free-regular-svg-icons';
import { faScissors } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { postData } from '../../apiService';

function HomePage() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("/user/login", { username, password });
      localStorage.setItem("token", response.token);
      navigate("/userAbout");
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
        style={{ backgroundImage: "url('https://png.pngtree.com/background/20230616/original/pngtree-barbershop-with-several-old-and-antique-chairs-picture-image_3629466.jpg')" }} // buraya kendi berber resmini ekle
      ></div>

      {/* Blur üzerine koyu overlay (isteğe bağlı) */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-md px-6 py-8 bg-white bg-opacity-90 rounded-2xl shadow-lg">
        
        {/* Admin Login Link */}
        <div className="text-center mb-4">
          <Link 
            to="/ownerLogin" 
            className="flex items-center justify-center text-red-600 hover:underline gap-2"
          >
            Yönetici Girişi <FontAwesomeIcon icon={faHandPointer} />
          </Link>
        </div>

        {/* Login Form */}
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faScissors} /> Kullanıcı Girişi
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Kullanıcı Adı</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              required  
              onChange={e => setUserName(e.target.value)} 
              value={username}
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400" 
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Şifre</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              onChange={e => setPassword(e.target.value)} 
              value={password}
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400" 
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox text-red-600" />
              <span className="text-sm text-gray-600">Beni Hatırla</span>
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200 font-semibold"
          >
            Giriş Yap
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 flex gap-2 items-center justify-center">
          Hesabınız yok mu? 
          <Link to="/userRegister" className="text-red-600 hover:underline">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
}

export default HomePage;
