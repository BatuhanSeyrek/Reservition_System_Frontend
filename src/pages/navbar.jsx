import React, { useEffect, useState, useRef } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getData } from '../apiService';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [role, setRole] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const userRes = await getData('/user/myUser', token);
        setName(userRes.userName);
        setRole('user');
      } catch {
        try {
          const adminRes = await getData('/admin/myAdmin', token);
          setName(adminRes.adminName);
          setStoreName(adminRes.storeName);
          setRole('admin');
        } catch {
          console.error('User veya admin bulunamadı.');
        }
      }
    };
    fetchData();
  }, [token]);

  // Dışarı tıklayınca menüyü kapat
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center relative">
      {/* Sol: Mağaza adı */}
      <div className="text-xl font-semibold text-black">
        {role === 'admin' ? storeName : 'MyApp'}
      </div>

      {/* Sağ: Kullanıcı/Admin bilgisi */}
      <div className="flex items-center space-x-3 text-black relative" ref={dropdownRef}>
        <span className="text-sm">{name}</span>
        <FontAwesomeIcon
          icon={faUser}
          className="w-5 h-5 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {/* Dropdown Menü */}
        {dropdownOpen && (
          <div className="absolute right-0 top-8 bg-white border rounded shadow-lg w-32">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
            >
              Çıkış Yap
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
