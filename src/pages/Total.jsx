import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../assets/supabaseClient";
import {
  Wallet,
  RotateCcw,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";

export default function Total() {
  const [totalMasuk, setTotalMasuk] = useState(0);
  const [totalKeluar, setTotalKeluar] = useState(0);
  const [selisih, setSelisih] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBudgetData = async () => {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData?.user?.email) {
        navigate("/login");
        return;
      }

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

      const { data: pemasukanData, error: pemasukanError } = await supabase
        .from("pemasukan")
        .select("jumlah")
        .eq("id_pengguna", userId);

      const { data: pengeluaranData, error: pengeluaranError } = await supabase
        .from("pengeluaran")
        .select("jumlah")
        .eq("id_pengguna", userId);

      if (pemasukanError || pengeluaranError) {
        console.error(
          "Gagal mengambil data:",
          pemasukanError || pengeluaranError
        );
        setLoading(false);
        return;
      }

      const totalPemasukan =
        pemasukanData?.reduce((sum, item) => sum + Number(item.jumlah), 0) || 0;
      const totalPengeluaran =
        pengeluaranData?.reduce((sum, item) => sum + Number(item.jumlah), 0) ||
        0;

      setTotalMasuk(totalPemasukan);
      setTotalKeluar(totalPengeluaran);
      setSelisih(totalPemasukan - totalPengeluaran);
      setLoading(false);
    };

    fetchBudgetData();
  }, [navigate]);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl mt-6 space-y-6 border border-yellow-400">
      <h1 className="text-3xl font-bold text-yellow-700 text-center flex items-center justify-center gap-2">
        <Wallet className="w-8 h-8" />
        Total Uang Kamu
      </h1>
      <p className="text-gray-600 text-center">
        Cek total pemasukan, pengeluaran, dan sisa anggaran kamu~
      </p>

      {loading ? (
        <p className="text-center text-gray-400">Memuat data...</p>
      ) : (
        <div className="space-y-4 text-lg">
          <div className="flex justify-between items-center bg-green-50 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 text-green-700 font-medium">
              <ArrowDownCircle className="w-6 h-6" />
              Total Pemasukan
            </div>
            <div className="font-semibold">Rp {totalMasuk.toLocaleString()}</div>
          </div>

          <div className="flex justify-between items-center bg-red-50 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 text-red-700 font-medium">
              <ArrowUpCircle className="w-6 h-6" />
              Total Pengeluaran
            </div>
            <div className="font-semibold">Rp {totalKeluar.toLocaleString()}</div>
          </div>

          <div className="border-t border-gray-200 my-2" />

          <div className="flex justify-between items-center bg-yellow-100 p-4 rounded-xl shadow-md text-xl font-bold">
            <div className="flex items-center gap-2 text-yellow-700">
              <RotateCcw className="w-6 h-6" />
              Sisa Anggaran
            </div>
            <div className={selisih >= 0 ? "text-green-700" : "text-red-700"}>
              Rp {selisih.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
