import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faUserTie,
  faUserPlus,
  faCircleQuestion,
  faUserMinus,
  faWrench,
  faUsers,
  faGear,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const menuItems = [
    { to: "/userAbout", label: "About", icon: faCircleInfo },
    { to: "/userInformation", label: "User Information", icon: faUsers },
    { to: "/userUpdate", label: "User Update", icon: faWrench },
    { to: "/allStores", label: "All Stores", icon: faUserTie },
    { to: "/informationReservation", label: "Information Reservations", icon: faCircleQuestion },
    { to: "/createReservation", label: "Create Reservation", icon: faUserPlus },
    { to: "/deleteReservation", label: "Delete Reservations", icon: faUserMinus },
    { to: "/userSettings", label: "Settings", icon: faGear }
  ];

  return (
    <div className="h-full w-72 bg-white shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">User Panel</h2>
      <ul className="space-y-2">
        {menuItems.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-2 rounded-lg font-medium transition duration-200 ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <span>{label}</span>
              <FontAwesomeIcon icon={icon} className="ml-2" />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
