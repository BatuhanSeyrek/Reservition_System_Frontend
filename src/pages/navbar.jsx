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
    <nav className="flex justify-between items-center relative">
      <div className="text-xl font-semibold text-black">
        {role === 'admin' ? storeName : 'MyApp'}
      </div>

      <div className="flex items-center space-x-3 text-black relative" ref={dropdownRef}>
        <span className="text-sm">{name}</span>
        <FontAwesomeIcon
          icon={faUser}
          className="w-5 h-5 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {dropdownOpen && (
          <div className="absolute right-0 top-8 bg-white border rounded shadow-lg w-32 z-10">
            <button
              onClick={() => {
                setDropdownOpen(false);
                if (role === 'admin') {
                  navigate('/ownerAbout');
                } else {
                  navigate('/userAbout');
                }
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Hakkında
            </button>
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
