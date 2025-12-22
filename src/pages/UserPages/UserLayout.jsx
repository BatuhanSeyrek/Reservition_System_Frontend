import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';
import UserSidebar from '../UserPages/useSidebar';
import Footer from '../footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function UserLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [referenceId, setReferenceId] = useState(null);

  useEffect(() => {
    const storedReferenceId = localStorage.getItem('referenceId');
    setReferenceId(storedReferenceId);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 shadow-md z-50 flex items-center px-6">
        
        {/* Hamburger → SADECE referenceId YOKSA */}
        {!referenceId && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300 mr-4"
            aria-label="Toggle sidebar"
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-black" />
          </button>
        )}

        {/* Navbar → referenceId gönderiliyor */}
        <div className="flex-1">
          <Navbar referenceId={referenceId} />
        </div>
      </header>

      {/* Sidebar */}
      {!referenceId && <UserSidebar isOpen={isSidebarOpen} />}

      {/* Main */}
      <main
        className={`transition-all duration-300 ease-in-out ${
          !referenceId && isSidebarOpen ? 'ml-72' : 'ml-0'
        } mt-16 mb-10 p-6 min-h-[calc(100vh-64px-40px)]`}
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-10 bg-gray-300 border-t flex items-center justify-center z-50">
        <Footer />
      </footer>
    </div>
  );
}
