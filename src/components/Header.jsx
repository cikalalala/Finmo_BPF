import { FaSearch, FaBell } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-yellow-400 to-green-800 shadow-md py-0 m-0">
      <div className="h-16 flex items-center justify-between m-0 p-0">

        {/* Logo dan Navigasi */}
        <div className="flex items-center gap-12 ml-15">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <img
              src="https://static.vecteezy.com/system/resources/previews/023/886/948/original/crypto-currency-coin-on-transparent-background-png.png"
              alt="Logo"
              className="w-6 h-6"
            />
            <span>FINMO</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-white text-sm font-medium">
            <a href="#" className="hover:underline">Dashboard</a>
            <a href="#" className="hover:underline">Laporan</a>
          </nav>
        </div>

        {/* Search, Notifikasi, dan Avatar */}
        <div className="flex items-center gap-6 text-white mr-2">

          {/* Search */}
          <button className="hover:text-gray-300">
            <FaSearch />
          </button>

          {/* Notifikasi */}
          <div className="relative">
            <FaBell className="text-white text-lg cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          {/* Avatar dan Nama */}
          <div className="flex items-center gap-2 mr-15">
            <img
              src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover border border-white"
            />
            <span className="hidden sm:inline font-medium">Hello, Sobat Finmo!</span>
          </div>
        </div>
      </div>
    </header>
  );
}
