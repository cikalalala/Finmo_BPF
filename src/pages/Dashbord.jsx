import {
  FaMoneyBillWave,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaClock
} from "react-icons/fa";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../assets/supabaseClient";
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

const COLORS = ["#8e44ad", "#f1c40f"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userId, setUserId] = useState(null);
  const [pemasukan, setPemasukan] = useState([]);
  const [pengeluaran, setPengeluaran] = useState([]);
  const [budgeting, setBudgeting] = useState(null);

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();

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
  const saldo = totalMasuk - totalKeluar;

  // Budget calculations
  const limit = budgeting?.jumlah || 0;
  const durasiBudget = budgeting?.durasi_hari || 0;
  const tanggalMulai = new Date(budgeting?.tanggal_mulai || new Date());
  const hariIni = new Date();
  
  const sisaHari = Math.max(
    0,
    durasiBudget - Math.floor((hariIni - tanggalMulai) / (1000 * 60 * 60 * 24))
  );

  const totalPengeluaran = totalKeluar;
  const totalTransaksi = pengeluaran.length;
  const saldoAkhir = limit - totalPengeluaran;

  // Combined transactions for charts
  const transaksiGabungan = [
    ...pemasukan.map((p) => ({ ...p, tipe: "Income" })),
    ...pengeluaran.map((p) => ({ ...p, tipe: "Expense" })),
  ].sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

  const statistik = generateStatistik(transaksiGabungan);

  return (
    <div className="px-5 py-6 space-y-6">
      <PageHeader title={`Hi, ${userName}`}></PageHeader>
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
            + Income
          </button>
          <button
            className="btn btn-primary w-full"
            onClick={() => navigate("/main/Dashboard/Pengeluaran")}
          >
            - Expense
          </button>
          <button
            className="btn btn-primary w-full"
            onClick={() => navigate("/main/Dashboard/Total")}
          >
            = Total
          </button>
        </div>
      

      {/* Budget Summary Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
        <SummaryCard
          icon={<FaWallet />}
          color="green"
          title={`Rp ${limit.toLocaleString('id-ID')}`}
          subtitle="Budget Limit"
        />
        <SummaryCard
          icon={<FaClock />}
          color="blue"
          title={`${sisaHari} days`}
          subtitle={`of ${durasiBudget} days`}
        />
        <SummaryCard
          icon={<FaArrowUp />}
          color="red"
          title={`${totalTransaksi}`}
          subtitle="Transactions"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          color={saldoAkhir >= 0 ? "green" : "red"}
          title={`Rp ${Math.abs(saldoAkhir).toLocaleString('id-ID')}`}
          subtitle={saldoAkhir >= 0 ? "Remaining" : "Deficit"}
        />
        <SummaryCard
          icon={<FaArrowDown />}
          color="purple"
          title={`Rp ${totalPengeluaran.toLocaleString('id-ID')}`}
          subtitle="Total Expenses"
        />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="card bg-base-100 shadow-md md:col-span-2">
          <div className="card-body">
            <h2 className="card-title text-green-700">Financial Statistics</h2>
            {statistik.length === 0 ? (
              <p className="text-center text-sm text-gray-500">
                No data available.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={statistik}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bulan" />
                  <YAxis />
                  <Tooltip
                    formatter={(val) => `Rp ${Number(val).toLocaleString('id-ID')}`}
                  />
                  <Legend />
                  <Line
                    type="linear"
                    dataKey="Income"
                    stroke="#8e44ad"
                    strokeWidth={2}
                  />
                  <Line
                    type="linear"
                    dataKey="Expense"
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
            <h2 className="card-title text-green-700">Financial Distribution</h2>
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
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    <Cell fill="#8e44ad" />
                    <Cell fill="#f1c40f" />
                  </Pie>
                  <Tooltip
                    formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`}
                  />
                  <Legend />
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
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="card bg-base-100 shadow-md">
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

function generateStatistik(transaksi) {
  const stats = {};

  transaksi.forEach((item) => {
    const date = new Date(item.tanggal);
    if (isNaN(date)) return;

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!stats[key]) {
      stats[key] = { bulan: key, Income: 0, Expense: 0 };
    }

    if (item.tipe === "Income") {
      stats[key].Income += Number(item.jumlah);
    } else {
      stats[key].Expense += Number(item.jumlah);
    }
  });

  return Object.values(stats).filter(
    (item) => item.Income > 0 || item.Expense > 0
  );
}