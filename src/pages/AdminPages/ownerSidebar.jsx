import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faBuildingUser,
  faWrench,
  faTrashCan,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

function OwnerSidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/ownerAbout', label: 'About', icon: faCircleInfo },
    { path: '/employeeDeleteUpdate', label: 'Employee Manage', icon: faBuildingUser },
    { path: '/chairDeleteUpdate', label: 'Chair Manage', icon: faWrench },
    { path: '/ownerUpdate', label: 'Admin Update', icon: faWrench },
    { path: '/ownerInformation', label: 'Admin Info', icon: faCircleQuestion },
    { path: '/ownerDelete', label: 'Admin Delete', icon: faTrashCan },
  ];

  return (
    <aside className="fixed top-16 bottom-16 left-0 w-64 bg-white shadow-lg p-6 z-40 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-8 text-blue-600">Admin Panel</h2>
      <ul className="space-y-4">
        {navItems.map(({ path, label, icon }) => (
          <li key={path}>
            <Link
              to={path}
              className={`flex items-center gap-3 p-2 rounded hover:bg-blue-100 ${
                location.pathname === path ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700'
              }`}
            >
              <FontAwesomeIcon icon={icon} className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default OwnerSidebar;
