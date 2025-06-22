import {
  FaMoneyBillWave,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../assets/supabaseClient";

const COLORS = ["#8e44ad", "#f1c40f"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Pengguna");
  const [pemasukan, setPemasukan] = useState([]);
  const [pengeluaran, setPengeluaran] = useState([]);

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData?.user?.email) {
        navigate("/login");
        return;
      }

      const { data: userRow, error: userError } = await supabase
        .from("users")
        .select("id, name")
        .eq("email", authData.user.email)
        .single();

      if (userError || !userRow) {
        console.error("User fetch error:", userError);
        navigate("/login");
        return;
      }

      setUserName(userRow.name || "Pengguna");
      fetchData(userRow.id);
    };

    fetchUserAndData();
  }, []);

  const fetchData = async (userId) => {
    const { data: dataMasuk } = await supabase
      .from("pemasukan")
      .select("*")
      .eq("id_pengguna", userId);

    const { data: dataKeluar } = await supabase
      .from("pengeluaran")
      .select("*")
      .eq("id_pengguna", userId);

    setPemasukan(dataMasuk || []);
    setPengeluaran(dataKeluar || []);
  };

  const totalMasuk = pemasukan.reduce((sum, x) => sum + Number(x.jumlah), 0);
  const totalKeluar = pengeluaran.reduce((sum, x) => sum + Number(x.jumlah), 0);
  const saldo = totalMasuk - totalKeluar;

  const transaksiGabungan = [
    ...pemasukan.map((p) => ({ ...p, tipe: "Pemasukan" })),
    ...pengeluaran.map((p) => ({ ...p, tipe: "Pengeluaran" })),
  ].sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

  const statistik = generateStatistik(transaksiGabungan);

  return (
    <div className="px-5 py-6 space-y-6">
      <PageHeader title={`Hi, ${userName}`}>
        <div className="grid grid-cols-4 gap-2 w-full">
          <button
            className="btn btn-primary w-full"
            onClick={() => navigate("/main/Dashboard/Budgeting")}
          >
            = Budgeting
          </button>
          <button
            className="btn btn-primary w-full"
            onClick={() => navigate("/main/Dashboard/Pemasukan")}
          >
            + Pemasukan
          </button>
          <button
            className="btn btn-primary w-full"
            onClick={() => navigate("/main/Dashboard/Pengeluaran")}
          >
            - Pengeluaran
          </button>

          <button
            className="btn btn-primary w-full"
            onClick={() => navigate("/main/Dashboard/Total")}
          >
            = Total
          </button>
        </div>
      </PageHeader>

      {/* Ringkasan */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard
          icon={<FaWallet />}
          color="green"
          title={`Rp ${saldo.toLocaleString()}`}
          subtitle="Saldo Akhir"
        />
        <SummaryCard
          icon={<FaArrowDown />}
          color="blue"
          title={`Rp ${totalMasuk.toLocaleString()}`}
          subtitle="Total Pemasukan"
        />
        <SummaryCard
          icon={<FaArrowUp />}
          color="red"
          title={`Rp ${totalKeluar.toLocaleString()}`}
          subtitle="Total Pengeluaran"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          color="yellow"
          title={`${transaksiGabungan.length} Transaksi`}
          subtitle="Total Transaksi"
        />
      </div>

      {/* Grafik */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Grafik Garis */}
        <div className="card bg-base-100 shadow-md md:col-span-2">
          <div className="card-body">
            <h2 className="card-title text-green-700">Statistik Keuangan</h2>
            {statistik.length === 0 ? (
              <p className="text-center text-sm text-gray-500">
                Belum ada data.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={statistik}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bulan" />
                  <YAxis />
                  <Tooltip
                    formatter={(val) => `Rp ${Number(val).toLocaleString()}`}
                  />
                  <Legend />
                  <Line
                    type="linear"
                    dataKey="Pemasukan"
                    stroke="#8e44ad"
                    strokeWidth={2}
                  />
                  <Line
                    type="linear"
                    dataKey="Pengeluaran"
                    stroke="#f1c40f"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-green-700">Distribusi Keuangan</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Pemasukan", value: totalMasuk },
                    { name: "Pengeluaran", value: totalKeluar },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  <Cell fill="#8e44ad" />
                  <Cell fill="#f1c40f" />
                </Pie>
                <Tooltip
                  formatter={(value) => `Rp ${value.toLocaleString()}`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

function SummaryCard({ icon, color, title, subtitle }) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body flex-row items-center gap-4">
        <div
          className={`bg-${color}-100 text-${color}-600 rounded-full p-4 text-xl`}
        >
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className={`text-sm text-${color}-500`}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function generateStatistik(transaksi) {
  const stats = {};

  transaksi.forEach((item) => {
    const date = new Date(item.tanggal);
    if (isNaN(date)) return;

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;

    if (!stats[key]) {
      stats[key] = { bulan: key, Pemasukan: 0, Pengeluaran: 0 };
    }

    if (item.tipe === "Pemasukan") {
      stats[key].Pemasukan += Number(item.jumlah);
    } else {
      stats[key].Pengeluaran += Number(item.jumlah);
    }
  });

  return Object.values(stats).filter(
    (item) => item.Pemasukan > 0 || item.Pengeluaran > 0
  );
}
