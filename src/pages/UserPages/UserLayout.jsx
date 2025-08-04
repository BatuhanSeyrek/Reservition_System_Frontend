import React from 'react';
import Navbar from '../navbar';
import Sidebar from '../UserPages/useSidebar';
import Footer from '../footer';

export default function UserLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-gray-300 shadow-md z-50 flex items-center px-6">
        <Navbar />
      </header>

      {/* Sidebar */}
      <aside className="fixed top-16 bottom-10 left-0 w-72 bg-white border-r border-gray-300 overflow-auto z-40">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="ml-72 mt-16 mb-10 p-6 overflow-auto min-h-[calc(100vh-64px-40px)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-10 bg-gray-300 border-t border-gray-300 flex items-center justify-center z-50 px-6">
        <Footer />
      </footer>
    </div>
  );
}
