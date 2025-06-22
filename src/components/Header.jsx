import { FaSearch, FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../assets/supabaseClient";

export default function Header() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="w-full bg-gradient-to-r from-yellow-400 to-green-800 shadow-md">
      <div className="h-16 flex items-center justify-between px-4">
        {/* Logo dan Navigasi */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <img
              src="https://static.vecteezy.com/system/resources/previews/023/886/948/original/crypto-currency-coin-on-transparent-background-png.png"
              alt="Logo"
              className="w-6 h-6"
            />
            <span>FINMO</span>
          </div>

          {/* Navigasi */}
          <nav className="hidden md:flex items-center gap-8 text-white text-sm font-medium">
            <Link to="/main/Dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/main/Laporan" className="hover:underline">
              Laporan
            </Link>
          </nav>
        </div>

        {/* Search, Notifikasi, dan Avatar + Logout */}
        <div className="relative flex items-center gap-6 text-white">
          <button className="hover:text-gray-300">
            <FaSearch />
          </button>

          <div className="relative">
            <FaBell className="text-white text-lg cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          <div
            className="relative flex items-center gap-2 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover border border-white"
            />
            <span className="hidden sm:inline font-medium">
              Hello, Sobat Finmo!
            </span>

            {showDropdown && (
              <div className="absolute right-0 top-12 bg-white text-black shadow-md rounded-md w-32 z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
