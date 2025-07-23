import { useState, useEffect } from "react";
import { ImSpinner2 as FaSpinner } from "react-icons/im";
import {
  FiGift,
  FiBriefcase,
  FiDollarSign,
  FiTrendingUp,
  FiMoreHorizontal,
} from "react-icons/fi";
import { supabase } from "../assets/supabaseClient";

export default function Pemasukan({ onClose }) { // Pastikan onClose diterima di sini
  const [kategoriDipilih, setKategoriDipilih] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const daftarKategori = [
    { nama: "Gaji", icon: <FiBriefcase className="text-2xl mb-1" /> },
    { nama: "Freelance", icon: <FiDollarSign className="text-2xl mb-1" /> },
    { nama: "Hadiah", icon: <FiGift className="text-2xl mb-1" /> },
    { nama: "Investasi", icon: <FiTrendingUp className="text-2xl mb-1" /> },
    { nama: "Lainnya", icon: <FiMoreHorizontal className="text-2xl mb-1" /> },
  ];

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setTanggal(formattedDate);

    const fetchUser = async () => {
      setLoading(true);
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData?.user) {
        console.error("Auth error in Pemasukan:", authError?.message || "User not found");
        alert("Autentikasi gagal. Silakan login ulang atau refresh halaman.");
        if (onClose && typeof onClose === 'function') { // Pastikan onClose adalah fungsi
          onClose();
        }
        setLoading(false);
        return;
      }

      if (authData?.user?.email) {
        const { data: userRow, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("email", authData.user.email)
          .single();

        if (userError || !userRow) {
          console.error("User table error in Pemasukan:", userError?.message || "User not found in DB");
          alert("Pengguna tidak ditemukan di tabel 'users'. Silakan login ulang.");
          if (onClose && typeof onClose === 'function') { // Pastikan onClose adalah fungsi
            onClose();
          }
        } else {
          setUserId(userRow.id);
        }
      } else {
        alert("Sesi pengguna tidak lengkap. Silakan login ulang.");
        if (onClose && typeof onClose === 'function') { // Pastikan onClose adalah fungsi
          onClose();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [onClose]); // Tambahkan onClose ke dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userId) {
      alert("Gagal mendapatkan ID pengguna. Silakan tunggu atau coba refresh halaman.");
      setLoading(false);
      return;
    }

    if (!kategoriDipilih || !jumlah || !deskripsi || !tanggal) {
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
      const inputDate = new Date(tanggal);
      const now = new Date();
      inputDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
      const finalTanggal = inputDate.toISOString();

      const { error } = await supabase.from("pemasukan").insert([
        {
          id_pengguna: userId,
          kategori: kategoriDipilih,
          jumlah: parsedJumlah,
          deskripsi,
          tanggal: finalTanggal,
        },
      ]);

      if (error) {
        alert("Gagal menyimpan pemasukan: " + error.message);
      } else {
        alert("Pemasukan berhasil ditambahkan!");
        if (onClose && typeof onClose === 'function') { // Pastikan onClose adalah fungsi
          onClose(); // Tutup modal dan picu refresh di Dashboard
        }
      }
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userId) {
    return (
      <div className="flex items-center justify-center p-8">
        <FaSpinner className="animate-spin text-4xl mr-3 text-green-500" />
        Memuat data pengguna...
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Tambah Pemasukan
      </h2>

      {!kategoriDipilih ? (
        <div className="grid grid-cols-3 gap-6">
          {daftarKategori.map((kategori) => (
            <button
              key={kategori.nama}
              onClick={() => setKategoriDipilih(kategori.nama)}
              className="flex flex-col items-center justify-center py-4 px-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition"
              disabled={loading}
            >
              {kategori.icon}
              <span className="text-sm">{kategori.nama}</span>
            </button>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="text-sm text-gray-600">
            Kategori: <strong>{kategoriDipilih}</strong>{" "}
            <button
              type="button"
              className="text-red-500 ml-2 text-xs underline"
              onClick={() => setKategoriDipilih("")}
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
              type="number"
              min="0"
              required
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Contoh: 100000"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Contoh: Bonus proyek"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !kategoriDipilih || !jumlah || !deskripsi || !tanggal}
            className={`w-full flex items-center justify-center font-semibold py-2 rounded-md transition ${
              loading || !kategoriDipilih || !jumlah || !deskripsi || !tanggal
                ? "bg-green-300 cursor-not-allowed text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
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