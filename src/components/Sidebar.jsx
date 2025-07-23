// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaChartLine, FaMoneyBillAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { supabase } from '../assets/supabaseClient'; // Pastikan path ini benar!

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol buka/tutup sidebar di mobile

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      alert("Gagal logout: " + error.message);
    } else {
      alert("Anda telah berhasil logout!");
      // Redirect ke halaman login setelah logout
      window.location.href = '/login'; 
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/main/Dashboard' },
    { name: 'Laporan', icon: <FaChartLine />, path: '/main/Laporan' },
    { name: 'Total Keuangan', icon: <FaMoneyBillAlt />, path: '/main/Total' },
  ];

  // Fungsi pembantu untuk mengecek apakah link aktif
  const isActive = (path) => location.pathname === path || (location.pathname.startsWith(path) && path !== '/main/Dashboard');

  return (
    <>
      {/* Tombol Hamburger untuk Mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="p-2 text-gray-800 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay Sidebar untuk Mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar itu sendiri */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-200">
          <h1 className="text-2xl font-extrabold text-blue-700">Finmo</h1>
          {/* Tombol tutup untuk mobile di dalam sidebar */}
          <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-700">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-grow p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-blue-700'
                  }`}
                  onClick={() => setIsOpen(false)} // Tutup sidebar saat link diklik (untuk mobile)
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="text-base">{item.name}</span>
                </Link>
              </li>
            ))}
            {/* Tombol Logout */}
            <li className="pt-4 border-t border-gray-200 mt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-3 rounded-lg transition-colors duration-200 text-red-600 hover:bg-red-100 font-semibold"
              >
                <span className="mr-3 text-lg"><FaSignOutAlt /></span>
                <span className="text-base">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;