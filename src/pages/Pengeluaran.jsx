import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { supabase } from "../assets/supabaseClient";

import {
  FaUtensils,
  FaBus,
  FaGamepad,
  FaFileInvoiceDollar,
  FaQuestionCircle,
} from "react-icons/fa";

export default function Pengeluaran() {
  const [kategori, setKategori] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
  const jumlahRef = useRef(null);

  const daftarKategori = [
    { label: "Makanan", icon: <FaUtensils size={20} /> },
    { label: "Transportasi", icon: <FaBus size={20} /> },
    { label: "Hiburan", icon: <FaGamepad size={20} /> },
    { label: "Tagihan", icon: <FaFileInvoiceDollar size={20} /> },
    { label: "Lainnya", icon: <FaQuestionCircle size={20} /> },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      setAuthLoading(true);
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData?.user) {
        console.error("Auth error:", authError?.message || "User not found");
        alert("Autentikasi gagal. Silakan login ulang.");
        navigate("/login");
        return;
      }

      const email = authData.user.email;

      const { data: userRow, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      if (userError || !userRow) {
        console.error("User table error:", userError?.message || "User not found in DB");
        alert("Pengguna tidak ditemukan di database.");
        navigate("/login");
        return;
      }

      setUserId(userRow.id);
      setAuthLoading(false);
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

    if (parseFloat(jumlah) <= 0) {
      alert("Jumlah harus lebih dari 0.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("pengeluaran").insert([
      {
        id_pengguna: userId,
        kategori,
        jumlah: parseFloat(jumlah),
        deskripsi,
        tanggal,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Insert error:", error.message);
      alert("Gagal menyimpan pengeluaran. Silakan coba lagi.");
    } else {
      alert("Pengeluaran berhasil ditambahkan!");
      navigate("/main/Dashboard");
    }
  };

  const isFormReady = kategori && jumlah && deskripsi && tanggal && userId;

  if (authLoading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <ImSpinner2 className="animate-spin inline-block mr-2" />
        Memuat data pengguna...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
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
            >
              <div className="mb-1">{item.icon}</div>
              {item.label}
            </button>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="text-sm text-gray-600">
            Kategori:{" "}
            <span className="font-medium text-red-700">{kategori}</span>
            <button
              type="button"
              onClick={() => setKategori("")}
              className="ml-2 text-red-500 hover:underline"
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
            />
          </div>

          <button
            type="submit"
            disabled={loading || !isFormReady}
            className={`w-full flex items-center justify-center font-semibold py-2 rounded-md transition ${
              loading || !isFormReady
                ? "bg-red-300 cursor-not-allowed text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {loading && <ImSpinner2 className="animate-spin mr-2" />}
            Simpan
          </button>
        </form>
      )}
    </div>
  );
}
