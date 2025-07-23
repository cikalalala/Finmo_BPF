// src/pages/NotFoundPage.jsx
// Pastikan ini ada dan isinya seperti yang saya berikan sebelumnya
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSadTear } from 'react-icons/fa'; // Contoh ikon

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-800 p-4 text-center">
      <FaSadTear className="text-indigo-500 text-6xl mb-6 animate-bounce-slow" />
      <h1 className="text-6xl font-extrabold mb-4 text-indigo-700">404</h1>
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Halaman Tidak Ditemukan</h2>
      <p className="text-lg mb-8 max-w-md">
        Maaf, kami tidak dapat menemukan halaman yang Anda cari.
        Mungkin Anda salah mengetik alamat, atau halaman tersebut sudah dipindahkan.
      </p>
      <Link
        to="/main/Dashboard" // Arahkan ke dashboard Anda
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
      >
        Kembali ke Dashboard
      </Link>
      <p className="mt-8 text-sm text-gray-500">
        Jika Anda yakin ini adalah kesalahan, silakan hubungi administrator.
      </p>
    </div>
  );
}