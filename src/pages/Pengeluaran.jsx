// src/pages/AddExpense.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { supabase } from "../assets/supabaseClient";

export default function AddExpense() {
  const [jumlah, setJumlah] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError) {
        console.error("Auth error:", authError.message);
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
        } else {
          setUserId(userRow.id);
        }
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userId) {
      alert("Gagal mendapatkan ID pengguna.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("pengeluaran").insert([
      {
        id_pengguna: userId,
        jumlah: parseFloat(jumlah),
        deskripsi,
        tanggal,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Gagal menyimpan pengeluaran: " + error.message);
    } else {
      alert("Pengeluaran berhasil ditambahkan!");
      navigate("/main/Dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Tambah Pengeluaran
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Jumlah (Rp)
          </label>
          <input
            type="number"
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
            placeholder="Contoh: Bayar listrik"
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
    </div>
  );
}
