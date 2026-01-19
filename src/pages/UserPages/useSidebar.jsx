import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faBookAtlas, faWrench, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const USER_LINKS = [
  { to: '/allStores', icon: faUserTie, label: 'Tüm Mağazalar' },
  { to: '/reservationUpdateDelete', icon: faBookAtlas, label: 'Rezervasyonlarım' },
  { to: '/userInformation', icon: faUsers, label: 'Kullanıcı Bilgileri' },
  { to: '/userUpdate', icon: faWrench, label: 'Bilgilerimi Güncelle' },
];

function UserSidebar({ isOpen, toggleSidebar }) {
  const { pathname } = useLocation();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-gray-900 border-r border-red-800 shadow-2xl z-50 p-6 overflow-y-auto transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h2 className="text-2xl font-semibold mb-8 text-red-500 text-center tracking-wide border-b border-red-700 pb-3">
          Kullanıcı Paneli
        </h2>

        <ul className="space-y-3">
          {USER_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 ${
                  pathname === link.to
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-200 hover:bg-red-700 hover:text-white'
                }`}
                onClick={() => toggleSidebar()}
              >
                <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default UserSidebar;
