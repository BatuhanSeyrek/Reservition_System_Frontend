import React from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      {/* Sol: Uygulama adı */}
      <div className="text-xl font-semibold text-black">MyApp</div>

      {/* Sağ: Kullanıcı bilgisi */}
      <div className="flex items-center space-x-3 text-black">
        <span className="text-sm">Batuhan SEYREK</span>
        <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
      </div>
    </nav>
  );
}
