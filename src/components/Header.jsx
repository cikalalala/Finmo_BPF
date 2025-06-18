import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  return (
    <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-6 py-4 bg-white shadow-md rounded-2xl border border-gray-100">
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Icons */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 hover:bg-blue-100 cursor-pointer transition-all duration-150 ease-in-out">
              <FaBell />
            </div>
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow-md animate-pulse">
              3
            </span>
          </div>

          <div className="p-3 bg-green-50 rounded-xl hover:bg-green-100 text-green-600 cursor-pointer transition-all duration-150 ease-in-out">
            <FcAreaChart size={20} />
          </div>

          <div className="p-3 bg-red-50 rounded-xl hover:bg-red-100 text-red-500 cursor-pointer transition-all duration-150 ease-in-out">
            <SlSettings />
          </div>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200" />

        {/* Profile */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">
            Welcome, <span className="font-semibold text-gray-900">Sobat FinMo</span>
          </span>
          <img
            src="https://avatar.iran.liara.run/public/28"
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-200 shadow-sm object-cover"
          />
        </div>
      </div>
    </header>
  );
}
