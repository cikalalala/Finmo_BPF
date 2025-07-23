import { useState, useEffect, useRef } from "react";
import { ImSpinner2 as FaSpinner } from "react-icons/im"; // Menggunakan FaSpinner untuk loading
import { supabase } from "../assets/supabaseClient";

import {
  FaUtensils,
  FaBus,
  FaGamepad,
  FaFileInvoiceDollar,
  FaQuestionCircle,
} from "react-icons/fa";

// Menerima prop 'onClose' dari Dashboard
export default function Pengeluaran({ onClose }) {
  const [kategori, setKategori] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [userId, setUserId] = useState(null); // userId dipertahankan sebagai state lokal
  const [loading, setLoading] = useState(false);
  const jumlahRef = useRef(null);

  const daftarKategori = [
    { label: "Makanan", icon: <FaUtensils size={20} /> },
    { label: "Transportasi", icon: <FaBus size={20} /> },
    { label: "Hiburan", icon: <FaGamepad size={20} /> },
    { label: "Tagihan", icon: <FaFileInvoiceDollar size={20} /> },
    { label: "Lainnya", icon: <FaQuestionCircle size={20} /> },
  ];

  useEffect(() => {
    // Set tanggal default ke tanggal hari ini saat komponen dimuat
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
    setTanggal(formattedDate);

    // --- Logika pengambilan userId dikembalikan ---
    const fetchUser = async () => {
      setLoading(true); // Mulai loading untuk fetch user
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData?.user) {
        console.error("Auth error in Pengeluaran:", authError?.message || "User not found");
        alert("Autentikasi gagal. Silakan login ulang atau refresh halaman.");
        onClose(); // Tutup modal jika autentikasi gagal
        setLoading(false);
        return;
      }

      const email = authData.user.email;

      const { data: userRow, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      if (userError || !userRow) {
        console.error(
          "User table error in Pengeluaran:",
          userError?.message || "User not found in DB"
        );
        alert("Pengguna tidak ditemukan di database. Silakan login ulang.");
        onClose(); // Tutup modal jika user tidak ditemukan
      } else {
        setUserId(userRow.id);
      }
      setLoading(false); // Akhiri loading setelah fetch user
    };

    fetchUser();
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mulai loading saat submit

    if (!userId) {
      alert("Gagal mendapatkan ID pengguna. Silakan tunggu atau coba refresh halaman.");
      setLoading(false);
      return;
    }

    if (!kategori || !jumlah || !deskripsi || !tanggal) {
      alert("Harap lengkapi semua data.");
      setLoading(false);
      return;
    }
    const parsedJumlah = parseFloat(jumlah);
    if (isNaN(parsedJumlah) || parsedJumlah <= 0) {
      alert("Jumlah harus angka positif.");
      setLoading(false);
      return;
    }

    try {
      // Menggabungkan tanggal dari input dengan waktu saat ini
      const inputDate = new Date(tanggal);
      const now = new Date();
      inputDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
      const finalTanggal = inputDate.toISOString();

      const { error } = await supabase.from("pengeluaran").insert([
        {
          id_pengguna: userId,
          kategori,
          jumlah: parsedJumlah,
          deskripsi,
          tanggal: finalTanggal,
        },
      ]);

      if (error) {
        console.error("Insert error in Pengeluaran:", error.message);
        alert("Gagal menyimpan pengeluaran. Silakan coba lagi.");
      } else {
        alert("Pengeluaran berhasil ditambahkan!");
        onClose(); // Tutup modal dan picu refresh di Dashboard
      }
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false); // Akhiri loading
    }
  };

  if (loading && !userId) { // Tampilkan spinner awal jika userId belum didapatkan
    return (
      <div className="flex items-center justify-center p-8">
        <FaSpinner className="animate-spin text-4xl mr-3 text-red-500" />
        Memuat data pengguna...
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Tambah Pengeluaran
      </h2>

      {!kategori ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {daftarKategori.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setKategori(item.label);
                setTimeout(() => jumlahRef.current?.focus(), 100);
              }}
              className="flex flex-col items-center justify-center bg-red-100 text-red-800 font-semibold py-4 rounded-xl hover:bg-red-200 transition text-sm md:text-base"
              disabled={loading}
            >
              <div className="mb-1">{item.icon}</div>
              {item.label}
            </button>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="text-sm text-gray-600">
            Kategori:
            <span className="font-medium text-red-700">{kategori}</span>
            <button
              type="button"
              onClick={() => setKategori("")}
              className="ml-2 text-red-500 hover:underline"
              disabled={loading}
            >
              Ganti
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jumlah (Rp)
            </label>
            <input
              ref={jumlahRef}
              type="number"
              required
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Contoh: 50000"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <input
              type="text"
              required
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal
            </label>
            <input
              type="date"
              required
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !kategori || !jumlah || !deskripsi || !tanggal}
            className={`w-full flex items-center justify-center font-semibold py-2 rounded-md transition ${
              loading || !kategori || !jumlah || !deskripsi || !tanggal
                ? "bg-red-300 cursor-not-allowed text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {loading && <FaSpinner className="animate-spin mr-2" />}
            Simpan
          </button>
        </form>
      )}
    </div>
  );
}