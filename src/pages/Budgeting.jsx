// src/pages/Budgeting.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../assets/supabaseClient";

export default function Budgeting() {
  const [totalMasuk, setTotalMasuk] = useState(0);
  const [totalKeluar, setTotalKeluar] = useState(0);
  const [selisih, setSelisih] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBudgetData = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData?.user?.email) {
        navigate("/login");
        return;
      }

      // Cari user ID di tabel users berdasarkan email
      const { data: userRow, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", authData.user.email)
        .single();

      if (userError || !userRow) {
        console.error("Gagal menemukan pengguna:", userError);
        navigate("/login");
        return;
      }

      const userId = userRow.id;

      // Ambil semua pemasukan user
      const { data: pemasukanData, error: pemasukanError } = await supabase
        .from("pemasukan")
        .select("jumlah")
        .eq("id_pengguna", userId);

      // Ambil semua pengeluaran user
      const { data: pengeluaranData, error: pengeluaranError } = await supabase
        .from("pengeluaran")
        .select("jumlah")
        .eq("id_pengguna", userId);

      if (pemasukanError || pengeluaranError) {
        console.error("Gagal mengambil data:", pemasukanError || pengeluaranError);
        setLoading(false);
        return;
      }

      const totalPemasukan = pemasukanData?.reduce((sum, item) => sum + Number(item.jumlah), 0) || 0;
      const totalPengeluaran = pengeluaranData?.reduce((sum, item) => sum + Number(item.jumlah), 0) || 0;

      setTotalMasuk(totalPemasukan);
      setTotalKeluar(totalPengeluaran);
      setSelisih(totalPemasukan - totalPengeluaran);
      setLoading(false);
    };

    fetchBudgetData();
  }, [navigate]);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg mt-6 space-y-6">
      <h1 className="text-2xl font-bold text-yellow-700 text-center">Halaman Budgeting</h1>
      <p className="mt-2 text-gray-600 text-center">
        Di sini kamu bisa cek total pemasukan, pengeluaran, dan sisa anggaran.
      </p>

      {loading ? (
        <p className="text-center text-gray-400">Memuat data...</p>
      ) : (
        <div className="text-lg space-y-3 mt-4">
          <div className="flex justify-between">
            <span>Total Pemasukan:</span>
            <span className="font-semibold text-green-600">
              Rp {totalMasuk.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total Pengeluaran:</span>
            <span className="font-semibold text-red-600">
              Rp {totalKeluar.toLocaleString()}
            </span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-xl font-bold">
            <span>Sisa Anggaran:</span>
            <span className={selisih >= 0 ? "text-green-700" : "text-red-700"}>
              Rp {selisih.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
