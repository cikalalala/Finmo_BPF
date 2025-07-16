import {
  FaMoneyBillWave,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaReceipt,
  FaMoneyCheckAlt, // Icon baru untuk sisa limit
  FaHandHoldingUsd, // Icon baru untuk uang terpakai
} from "react-icons/fa";
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

const COLORS = ["#28a745", "#dc3545"]; // Hijau & Merah

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userId, setUserId] = useState(null);
  const [pemasukan, setPemasukan] = useState([]);
  const [pengeluaran, setPengeluaran] = useState([]);
  const [budgeting, setBudgeting] = useState(null);

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

      setUserName(userRow.name || "User");
      setUserId(userRow.id);
      fetchData(userRow.id);
      fetchBudget(userRow.id);
    };

    fetchUserAndData();
  }, [navigate]);

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

  const fetchBudget = async (userId) => {
    const { data, error } = await supabase
      .from("budgeting")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (!error && data && data.length > 0) {
      setBudgeting(data[0]);
    } else {
      console.log("No budget data found or error:", error);
      setBudgeting(null);
    }
  };

  // Calculate totals
  const totalMasuk = pemasukan.reduce((sum, x) => sum + Number(x.jumlah), 0);
  const totalKeluar = pengeluaran.reduce((sum, x) => sum + Number(x.jumlah), 0);

  // Budget calculations
  const limit = budgeting?.jumlah || 0;
  const durasiBudget = budgeting?.durasi_hari || 0;
  const tanggalMulaiBudget = budgeting?.tanggal_mulai ? new Date(budgeting.tanggal_mulai) : null;
  const hariIni = new Date();

  const sisaHari = Math.max(0, durasiBudget - Math.floor((hariIni - (tanggalMulaiBudget || hariIni)) / (1000 * 60 * 60 * 24)));
  
  const pengeluaranSetelahBudgetDiset = pengeluaran.filter(item => {
    if (!tanggalMulaiBudget) return false;
    const tanggalPengeluaran = new Date(item.tanggal);
    return tanggalPengeluaran >= tanggalMulaiBudget;
  }).reduce((sum, x) => sum + Number(x.jumlah), 0);

  const sisaLimit = limit - pengeluaranSetelahBudgetDiset;

  const totalPemasukan = totalMasuk;
  const totalTransaksi = pengeluaran.length;
  const saldoAkhir = totalPemasukan - totalKeluar;

  const statistikPengeluaranBudget = generateStatistikPengeluaran(pengeluaran, tanggalMulaiBudget);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen px-5 py-6 space-y-6">
      <PageHeader title={`Hi, ${userName}`} />

      {/* Section: Tombol-tombol navigasi - MODIFIKASI UKURAN DI SINI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
        <button
          onClick={() => navigate("/main/Dashboard/Budgeting")}
          // Perubahan: py-5 untuk padding vertikal lebih besar, text-lg untuk ukuran teks
          className="w-full py-5 px-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-md hover:brightness-110 transition duration-200 text-lg" 
        >
          = Budgeting
        </button>
        <button
          onClick={() => navigate("/main/Dashboard/Pemasukan")}
          // Perubahan: py-5 untuk padding vertikal lebih besar, text-lg untuk ukuran teks
          className="w-full py-5 px-4 bg-emerald-600 text-white rounded-xl font-semibold shadow-md hover:brightness-110 transition duration-200 text-lg"
        >
          + Income
        </button>
        <button
          onClick={() => navigate("/main/Dashboard/Pengeluaran")}
          // Perubahan: py-5 untuk padding vertikal lebih besar, text-lg untuk ukuran teks
          className="w-full py-5 px-4 bg-rose-600 text-white rounded-xl font-semibold shadow-md hover:brightness-110 transition duration-200 text-lg"
        >
          - Expense
        </button>
        <button
          onClick={() => navigate("/main/Dashboard/Total")}
          // Perubahan: py-5 untuk padding vertikal lebih besar, text-lg untuk ukuran teks
          className="w-full py-5 px-4 bg-purple-600 text-white rounded-xl font-semibold shadow-md hover:brightness-110 transition duration-200 text-lg"
        >
          = Total
        </button>
      </div>

      {/* Pembungkus Utama untuk Kolom Kiri dan Kanan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* KOLOM KIRI */}
        <div>
          {/* Bagian Summary Cards "KIRI" */}
          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
            <SummaryCard
              icon={<FaWallet />}
              color="emerald"
              title={`Rp ${limit.toLocaleString("id-ID")}`}
              subtitle="Budget Limit"
            />
            <SummaryCard
              icon={<FaClock />}
              color="sky"
              title={`${sisaHari} days`}
              subtitle={`of ${durasiBudget} days`}
            />
            <SummaryCard
              icon={<FaMoneyCheckAlt />}
              color={sisaLimit >= 0 ? "emerald" : "rose"}
              title={`Rp ${Math.abs(sisaLimit).toLocaleString("id-ID")}`}
              subtitle={sisaLimit >= 0 ? "Sisa Limit" : "Over Budget"}
            />
            <SummaryCard
              icon={<FaHandHoldingUsd />}
              color="amber"
              title={`Rp ${pengeluaranSetelahBudgetDiset.toLocaleString("id-ID")}`}
              subtitle="Uang Terpakai"
            />
          </div>

          {/* Charts (Line Chart) "KIRI" */}
          <div className="card bg-white shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Financial Statistics (Budget Period)
            </h2>
            {statistikPengeluaranBudget.length === 0 ? (
              <p className="text-center text-sm text-gray-500">
                No expense data available for the current budget period.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={statistikPengeluaranBudget}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="bulan"
                    tickFormatter={(tick) => {
                      const [year, month] = tick.split("-");
                      const date = new Date(year, month - 1);
                      return date.toLocaleString("en-US", {
                        month: "short",
                        year: "2-digit",
                      });
                    }}
                  />
                  <YAxis
                    tickFormatter={(tick) => {
                        if (Math.abs(tick) >= 1_000_000) {
                            return `${ (tick / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} JT`;
                        }
                        if (Math.abs(tick) >= 1_000) {
                            return `${ (tick / 1_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} RB`;
                        }
                        return `${Number(tick).toLocaleString("id-ID")}`;
                    }}
                    interval="preserveStartEnd"
                  />
                  <Tooltip
                    formatter={(val) =>
                      `Rp ${Number(val).toLocaleString("id-ID")}`
                    }
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Expense"
                    stroke={COLORS[1]}
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div>
          {/* Bagian Summary Cards "KANAN" */}
          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
            <SummaryCard
              icon={<FaArrowUp />}
              color="emerald"
              title={`Rp ${totalPemasukan.toLocaleString("id-ID")}`}
              subtitle="Total Income"
            />
            <SummaryCard
              icon={<FaArrowDown />}
              color="rose"
              title={`Rp ${totalKeluar.toLocaleString("id-ID")}`}
              subtitle="Total Expenses"
            />
            <SummaryCard
              icon={<FaReceipt />}
              color="sky"
              title={`${totalTransaksi}`}
              subtitle="Transactions"
            />
            <SummaryCard
              icon={<FaMoneyBillWave />}
              color={saldoAkhir >= 0 ? "emerald" : "rose"}
              title={`Rp ${Math.abs(saldoAkhir).toLocaleString("id-ID")}`}
              subtitle={saldoAkhir >= 0 ? "Remaining" : "Deficit"}
            />
          </div>

          {/* Pie Chart "KANAN" */}
          <div className="card bg-white shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Financial Distribution
            </h2>
            {totalMasuk === 0 && totalKeluar === 0 ? (
              <p className="text-center text-sm text-gray-500">
                No data available.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Income", value: totalMasuk },
                      { name: "Expense", value: totalKeluar },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    animationBegin={0}
                    animationDuration={800}
                    animationEasing="ease-out"
                  >
                    <Cell key="income" fill={COLORS[0]} />
                    <Cell key="expense" fill={COLORS[1]} />
                  </Pie>
                  <Tooltip
                    formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
                  />
                  <Legend align="center" verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

// Helper components
function PageHeader({ title, children }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
}

function SummaryCard({ icon, color, title, subtitle }) {
  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-600",
    sky: "bg-sky-100 text-sky-600",
    rose: "bg-rose-100 text-rose-600",
    amber: "bg-amber-100 text-amber-600",
    violet: "bg-violet-100 text-violet-600",
  };

  return (
    <div className="card bg-white shadow-md">
      <div className="card-body flex-row items-center gap-4">
        <div className={`${colorClasses[color]} rounded-full p-3 text-xl`}>
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function generateStatistikPengeluaran(pengeluaranData, tanggalMulaiBudget) {
  const stats = {};

  const filteredPengeluaran = pengeluaranData.filter(item => {
    if (!tanggalMulaiBudget) return false;
    const tanggalPengeluaran = new Date(item.tanggal);
    return tanggalPengeluaran >= tanggalMulaiBudget;
  });

  filteredPengeluaran.forEach((item) => {
    const date = new Date(item.tanggal);
    if (isNaN(date)) return;

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;

    if (!stats[key]) {
      stats[key] = { bulan: key, Expense: 0 };
    }

    stats[key].Expense += Number(item.jumlah);
  });

  return Object.values(stats).filter((item) => item.Expense > 0);
}