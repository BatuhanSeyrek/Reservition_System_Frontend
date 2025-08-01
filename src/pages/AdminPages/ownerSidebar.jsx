import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo ,faUserTie,faUserPlus,faCircleQuestion,faUserMinus,faWrench,faUsers,faBuildingUser,faChair,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function ownerSidebar() {
  return (
    <div className="top-0 left-0 h-screen w-70 bg-white shadow-md p-6 sticky self-start h-fit bottom-full">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Admin Panel</h2>
      <ul className="space-y-4">
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/ownerAbout" className="flex items-center gap-2">
            <span>About</span>
            <FontAwesomeIcon icon={faCircleInfo} className="text-dark-500 mr-2" />
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/employeeList" className="flex items-center gap-2">
            <span>Employee List</span>
            <FontAwesomeIcon icon={faUsers} className="text-dark-500 mr-2" />
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
            <Link to="/employeeDeleteUpdate" className="flex items-center gap-2">
            <span>Employee Delete Update</span>
            <FontAwesomeIcon icon={faBuildingUser} className="text-dark-500 mr-2" />
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
            <Link to="/chairList" className="flex items-center gap-2">
            <span>Chair List</span>
            <FontAwesomeIcon icon={faChair} className="text-dark-500 mr-2" />
            </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/chairDeleteUpdate" className="flex items-center gap-2">
            <span>Chair Delete Update</span>
            <FontAwesomeIcon icon={faWrench} className="text-dark-500 mr-2" />
            <FontAwesomeIcon icon={faTrashCan} className="text-dark-500 mr-2" />
          </Link>
          </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/ownerUpdate" className="flex items-center gap-2">
            <span>Admin Update</span>
            <FontAwesomeIcon icon={faWrench} className="text-dark-500 mr-2" />
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/ownerInformation" className="flex items-center gap-2">
            <span>Admin Information</span>
            <FontAwesomeIcon icon={faCircleQuestion} className="text-dark-500 mr-2" />
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/chairToEmployee" className="flex items-center gap-2">
            <span>Chair to an Employee</span>
            <FontAwesomeIcon icon={faUserPlus} className="text-dark-500 mr-2" />
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/ownerDelete" className="flex items-center gap-2">
            <span>Admin Delete</span>
            <FontAwesomeIcon icon={faTrashCan} className="text-dark-500 mr-2" />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default ownerSidebar