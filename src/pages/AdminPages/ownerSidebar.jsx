import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleInfo, faUserPlus, faCircleQuestion,
  faUsers, faBuildingUser, faChair,
  faTrashCan, faWrench
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function OwnerSidebar({ isOpen }) {
  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-72 bg-white shadow-md p-6 transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Admin Panel</h2>
      <ul className="space-y-4">
        <li className="text-gray-700 hover:text-blue-600">
          <Link to="/about" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCircleInfo} />
            <span>About</span>
            
          </Link>
        </li>

        <li className="text-gray-700 hover:text-blue-600">
          <Link to="/employeeDeleteUpdate" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBuildingUser} />
            <span>Employee Delete Update</span>
            
          </Link>
        </li>
        
        <li className="text-gray-700 hover:text-blue-600">
          <Link to="/chairDeleteUpdate" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faWrench} />
            <FontAwesomeIcon icon={faTrashCan} />
            <span>Chair Delete Update</span>
            
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600">
          <Link to="/ownerUpdate" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faWrench} />
            <span>Admin Update</span>
            
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600">
          <Link to="/ownerInformation" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCircleQuestion} />
            <span>Admin Information</span>
            
          </Link>
        </li>
        
        <li className="text-gray-700 hover:text-blue-600">
          <Link to="/ownerDelete" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faTrashCan} />
            <span>Admin Delete</span>
            
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default OwnerSidebar;
