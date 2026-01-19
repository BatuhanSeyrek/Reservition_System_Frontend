import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuildingUser,
  faChair,
  faWrench,
  faCircleQuestion,
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

function OwnerSidebar({ isOpen }) {
  const { pathname } = useLocation();

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-40" />}

      <aside
        className={`fixed top-16 bottom-0 left-0 w-72 bg-gray-900 border-r border-red-800 shadow-xl z-50 px-5 py-6 overflow-y-auto transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h2 className="text-2xl font-semibold mb-8 text-red-500 text-center tracking-wide border-b border-red-700 pb-3">
          Yönetici Paneli
        </h2>

        <ul className="space-y-3">
          <li>
            <Link
              to="/employeeDeleteUpdate"
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 ${
                pathname === '/employeeDeleteUpdate'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-200 hover:bg-red-700 hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faBuildingUser} className="w-5 h-5" />
              <span className="text-sm font-medium">Çalışan Yönetimi</span>
            </Link>
          </li>

          <li>
            <Link
              to="/chairDeleteUpdate"
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 ${
                pathname === '/chairDeleteUpdate'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-200 hover:bg-red-700 hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faChair} className="w-5 h-5" />
              <span className="text-sm font-medium">Koltuk Yönetimi</span>
            </Link>
          </li>

          <li>
            <Link
              to="/ownerUpdate"
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 ${
                pathname === '/ownerUpdate'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-200 hover:bg-red-700 hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faWrench} className="w-5 h-5" />
              <span className="text-sm font-medium">Yönetici Ayarları</span>
            </Link>
          </li>

  

          <li>
            <Link
              to="/adminReservations"
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 ${
                pathname === '/adminReservations'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-200 hover:bg-red-700 hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="w-5 h-5" />
              <span className="text-sm font-medium">Rezervasyon Bilgileri</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default OwnerSidebar;
