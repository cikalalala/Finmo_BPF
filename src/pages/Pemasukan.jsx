import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import {
  FiGift,
  FiBriefcase,
  FiDollarSign,
  FiTrendingUp,
  FiMoreHorizontal,
} from "react-icons/fi";
import { supabase } from "../assets/supabaseClient";

export default function Pemasukan() {
  const [kategoriDipilih, setKategoriDipilih] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState(""); // Ini tetap untuk input type="date"
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const daftarKategori = [
    { nama: "Gaji", icon: <FiBriefcase className="text-2xl mb-1" /> },
    { nama: "Freelance", icon: <FiDollarSign className="text-2xl mb-1" /> },
    { nama: "Hadiah", icon: <FiGift className="text-2xl mb-1" /> },
    { nama: "Investasi", icon: <FiTrendingUp className="text-2xl mb-1" /> },
    { nama: "Lainnya", icon: <FiMoreHorizontal className="text-2xl mb-1" /> },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError) {
        console.error("Auth error:", authError.message);
        navigate("/login");
        return;
      }

      if (authData?.user?.email) {
        const { data: userRow, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("email", authData.user.email)
          .single();

        if (userError) {
          console.error("User table error:", userError.message);
          alert("Pengguna tidak ditemukan di tabel 'users'.");
          navigate("/login"); // Redirect jika user tidak ditemukan
        } else {
          setUserId(userRow.id);
        }
      } else {
        navigate("/login"); // Redirect jika tidak ada user
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userId) {
      alert("Gagal mendapatkan ID pengguna.");
      setLoading(false);
      return;
    }

    if (!kategoriDipilih || !jumlah || !deskripsi || !tanggal) {
      alert("Harap lengkapi semua data.");
      setLoading(false);
      return;
    }

    // Pastikan jumlah adalah angka yang valid dan positif
    const parsedJumlah = parseFloat(jumlah);
    if (isNaN(parsedJumlah) || parsedJumlah <= 0) {
      alert("Jumlah harus angka positif.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.from("pemasukan").insert([
        {
          id_pengguna: userId,
          kategori: kategoriDipilih,
          jumlah: parsedJumlah,
          deskripsi,
          // <<< PERUBAHAN DI SINI: Simpan waktu saat ini untuk pemasukan >>>
          tanggal: new Date().toISOString(), // Menggunakan waktu submit form
        },
      ]);

      setLoading(false);

      if (error) {
        alert("Gagal menyimpan pemasukan: " + error.message);
      } else {
        alert("Pemasukan berhasil ditambahkan!");
        navigate("/main/Dashboard");
      }
    } catch (err) {
      setLoading(false);
      alert("Terjadi kesalahan: " + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
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
            >
              {kategori.icon}
              <span className="text-sm">{kategori.nama}</span>
            </button>
          ))}
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-md transition duration-300"
          >
            Kembali
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="text-sm text-gray-600">
            Kategori: <strong>{kategoriDipilih}</strong>{" "}
            <button
              type="button"
              className="text-red-500 ml-2 text-xs underline"
              onClick={() => setKategoriDipilih("")}
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
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
          >
            {loading && <ImSpinner2 className="animate-spin mr-2" />}
            Simpan
          </button>
        </form>
      )}
    </div>
  );
}