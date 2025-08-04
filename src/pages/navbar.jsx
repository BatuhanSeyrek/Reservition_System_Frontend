import React from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-300 text-white px-6 py-3 shadow flex justify-between items-center ml-70">
      {/* Sol taraf: Uygulama adı */}
      <div className="text-xl font-semibold text-black">MyApp</div>

      {/* Sağ taraf: Admin bilgisi */}
      <div className="flex items-center space-x-3 text-black">
        <span className="text-sm">Batuhan SEYREK</span>
        <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
      </div>
    </nav>
  );
}

export default Navbar;
