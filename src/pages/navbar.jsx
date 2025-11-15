// Navbar.jsx
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
    <nav className="flex justify-between items-center relative bg-white/90 backdrop-blur-md shadow-md px-6 py-3 border-b border-gray-200">
      <div className="text-xl font-bold text-red-600 cursor-pointer">
        {role === 'admin' ? storeName : 'MyApp'}
      </div>

      <div className="flex items-center space-x-3 text-black relative" ref={dropdownRef}>
        <span className="text-sm font-medium">{name}</span>
        <FontAwesomeIcon
          icon={faUser}
          className="w-6 h-6 cursor-pointer text-red-600 hover:text-red-700 transition"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {dropdownOpen && (
          <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg w-40 z-10 animate-fadeIn overflow-hidden">
            <button
              onClick={() => {
                setDropdownOpen(false);
                if (role === 'admin') navigate('/ownerAbout');
                else navigate('/userAbout');
              }}
              className="w-full px-4 py-2 text-left hover:bg-red-50 text-gray-800 flex items-center gap-2"
            >
              About
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 flex items-center gap-2 border-t"
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
