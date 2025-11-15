// Navbar.jsx
import React, { useEffect, useState, useRef } from 'react';
import { faUser, faScissors } from '@fortawesome/free-solid-svg-icons';
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
    <nav className="flex justify-between items-center relative bg-gray-800 text-red-500 shadow-md px-6 py-3">
      {/* Logo + Makas */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <span className="text-xl font-bold text-white">{role === 'admin' ? storeName : 'MyApp'}</span>
        <FontAwesomeIcon
          icon={faScissors}
          className="w-5 h-5 text-red-500 animate-bounce"
        />
      </div>

      {/* Kullanıcı kısmı */}
      <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
        <span className="text-sm font-medium text-white">{name}</span>
        <FontAwesomeIcon
          icon={faUser}
          className="w-6 h-6 cursor-pointer text-red-500 hover:text-red-400 transition"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {dropdownOpen && (
          <div className="absolute right-0 top-10 bg-gray-700 border border-gray-600 rounded-lg shadow-lg w-40 z-10 animate-fadeIn overflow-hidden">
            <button
              onClick={() => {
                setDropdownOpen(false);
                if (role === 'admin') navigate('/ownerAbout');
                else navigate('/userAbout');
              }}
              className="w-full px-4 py-2 text-left hover:bg-red-600 hover:text-white flex items-center gap-2"
            >
              About
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-red-300 hover:bg-red-600 hover:text-white flex items-center gap-2 border-t border-gray-600"
            >
              Exit
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>
    </nav>
  );
}
