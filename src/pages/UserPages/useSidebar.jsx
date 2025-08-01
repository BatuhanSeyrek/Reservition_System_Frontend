import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo ,faUserTie,faUserPlus,faCircleQuestion,faUserMinus,faWrench,faUsers} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="top-0 left-0 h-screen w-70 bg-white shadow-md p-6 sticky self-start h-fit bottom-full">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">User Panel</h2>
      <ul className="space-y-4">
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/userAbout" className="flex items-center gap-2">
            <span>About</span>
            <FontAwesomeIcon icon={faCircleInfo} className="text-dark-500 mr-2" />
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/userInformation" className="flex items-center gap-2">
            <span>User Information</span>
            <FontAwesomeIcon icon={faUsers} className="text-dark-500 mr-2" />
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/userUpdate" className="flex items-center gap-2">
            <span>User Update</span>
            <FontAwesomeIcon icon={faWrench} className="text-dark-500 mr-2" />

          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/allStores" className="flex items-center gap-2">
            <span>All Stores</span>
             <FontAwesomeIcon icon={faUserTie} className="text-dark-500 mr-2" />
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/informationReservation" className="flex items-center gap-2">
            <span>İnformation Reservations</span>
            <FontAwesomeIcon icon={faCircleQuestion } className="text-dark-500 mr-2" />
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/createReservation" className="flex items-center gap-2">
            <span>Create Reservation</span>
            <FontAwesomeIcon icon={faUserPlus} className="text-dark-500 mr-2" />
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          <Link to="/deleteReservation" className="flex items-center gap-2">
            <span>Delete Reservations</span>
            <FontAwesomeIcon icon={faUserMinus} className="text-dark-500 mr-2" />
          </Link>
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Ayarlar</li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Çıkış</li>
      </ul>
    </div>
  )
}

export default Sidebar