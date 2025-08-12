import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faUserTie,
  faBookAtlas,
  faWrench,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

function UserSidebar({ isOpen }) {
  const { pathname } = useLocation(); // aktif path

  return (
    <aside
      className={`fixed top-16 bottom-10 left-0 w-72 bg-white border-r border-gray-200 shadow-xl z-40 px-5 py-6 overflow-y-auto transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 2xl:translate-x-0`}
    >
      <h2 className="text-2xl font-semibold mb-8 text-blue-700 text-center tracking-wide">
        User Panel
      </h2>

      <ul className="space-y-3">
        <li>
          <Link
            to="/userAbout"
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
              pathname === '/userAbout'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <FontAwesomeIcon icon={faCircleInfo} className="w-5 h-5" />
            <span className="text-sm font-medium">About</span>
          </Link>
        </li>

        <li>
          <Link
            to="/userInformation"
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
              pathname === '/userInformation'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />
            <span className="text-sm font-medium">User Information</span>
          </Link>
        </li>

        <li>
          <Link
            to="/userUpdate"
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
              pathname === '/userUpdate'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <FontAwesomeIcon icon={faWrench} className="w-5 h-5" />
            <span className="text-sm font-medium">User Update</span>
          </Link>
        </li>

        <li>
          <Link
            to="/allStores"
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
              pathname === '/allStores'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <FontAwesomeIcon icon={faUserTie} className="w-5 h-5" />
            <span className="text-sm font-medium">All Stores</span>
          </Link>
        </li>
        <li>
          <Link
            to="/reservationUpdateDelete"
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
              pathname === '/reservationUpdateDelete'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <FontAwesomeIcon icon={faBookAtlas} className="w-5 h-5" />
            <span className="text-sm font-medium">Reservation</span>
          </Link>
        </li>
      
      </ul>
    </aside>
  );
}

export default UserSidebar;
