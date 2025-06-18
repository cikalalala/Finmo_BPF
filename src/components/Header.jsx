import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4 py-4 bg-white shadow-sm rounded-xl">
            {/* Search Bar */}
            <div className="relative w-full max-w-md mx-auto md:mx-0">
                <input
                    type="text"
                    placeholder="Search here..."
                    className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-between md:justify-end gap-4">
                {/* Icons */}
                <div className="relative group">
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600 hover:bg-blue-100 cursor-pointer transition">
                        <FaBell />
                    </div>
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow-sm">
                        50
                    </span>
                </div>
                <div className="p-3 bg-green-50 rounded-xl hover:bg-green-100 cursor-pointer transition">
                    <FcAreaChart size={20} />
                </div>
                <div className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 cursor-pointer transition">
                    <SlSettings />
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-5 ml-2 border-l border-gray-200">
                    <span className="text-sm text-gray-700 whitespace-nowrap">
                        Hello, <span className="font-semibold">Sobat Finmo!</span>
                    </span>
                    <img
                        src="https://avatar.iran.liara.run/public/28"
                        alt="Profile"
                        className="w-10 h-10 rounded-full shadow-sm"
                    />
                </div>
            </div>
        </header>
    );
}
