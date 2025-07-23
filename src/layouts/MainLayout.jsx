// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Import Sidebar component yang baru

export default function MainLayout() {
  return (
    <div id="app-container" className="flex min-h-screen bg-gray-100"> {/* Gunakan flex untuk mengatur sidebar dan konten */}
      <Sidebar /> {/* Render Sidebar di sini */}
      <main className="flex-1 p-4 lg:ml-64 pt-16 lg:pt-0"> {/* Konten utama mengambil sisa ruang, sesuaikan untuk lebar sidebar */}
        <Outlet />
      </main>
    </div>
  );
}