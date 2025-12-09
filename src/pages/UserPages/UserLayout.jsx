import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';
import UserSidebar from '../UserPages/useSidebar';
import Footer from '../footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function UserLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [token, setToken] = useState(null);

  // Token'ı localStorage'dan al
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Header: Hamburger + Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 shadow-md z-50 flex items-center px-6">
        {/* Hamburger buton - Sadece token varsa göster */}
        {token && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded bg-gray-200 hover:bg-gray-200 mr-4"
            aria-label="Toggle sidebar"
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-black" />
          </button>
        )}

        {/* Navbar her zaman görünür */}
        <div className="flex-1">
          <Navbar />
        </div>
      </header>

      {/* Sidebar: Token varsa ve açık ise göster */}
      {token && <UserSidebar isOpen={isSidebarOpen} />}

      {/* Ana içerik alanı */}
      <main
        className={`transition-all my-auto duration-300 ease-in-out ${
          token && isSidebarOpen ? 'ml-72' : 'ml-0'
        } mt-16 mb-10 p-6 overflow-auto min-h-[calc(100vh-64px-40px)]`}
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-10 bg-gray-300 border-t border-gray-300 flex items-center justify-center z-50 px-6">
        <Footer />
      </footer>
    </div>
  );
}
