import {
  FaMoneyBillWave,
  FaWallet,
  FaArrowUp,
  FaArrowDown
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
  Legend
} from "recharts";

// Data Statistik Keuangan
const statisticData = [
  { name: "Jan", Pemasukan: 2500000, Pengeluaran: 1200000 },
  { name: "Feb", Pemasukan: 2000000, Pengeluaran: 1000000 },
  { name: "Mar", Pemasukan: 2700000, Pengeluaran: 1500000 },
  { name: "Apr", Pemasukan: 3000000, Pengeluaran: 1800000 },
  { name: "May", Pemasukan: 2200000, Pengeluaran: 1400000 },
  { name: "Jun", Pemasukan: 2800000, Pengeluaran: 1300000 }
];

// Data Pie Chart Distribusi
const distribusiData = [
  { name: "Pemasukan", value: 15000000 },
  { name: "Pengeluaran", value: 8000000 }
];

const COLORS = ["#00C49F", "#FF6B6B"];

export default function Dashboard() {
  return (
    <div id="dashboard-container" className="px-5 py-6">
      {/* Header Page */}
      <PageHeader title="Hi, Kelompok 6" >
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          + Tambah Catatan
        </button>
      </PageHeader>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {/* Saldo Akhir */}
        <div className="flex items-center space-x-5 bg-white rounded-xl shadow-md p-4">
          <div className="bg-green-100 text-green-600 rounded-full p-4 text-xl">
            <FaWallet />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">Rp 1.300.000</span>
            <span className="text-gray-500 text-sm">Saldo Akhir</span>
          </div>
        </div>

        {/* Total Pemasukan */}
        <div className="flex items-center space-x-5 bg-white rounded-xl shadow-md p-4">
          <div className="bg-blue-100 text-blue-600 rounded-full p-4 text-xl">
            <FaArrowDown />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">Rp 15.000.000</span>
            <span className="text-gray-500 text-sm">Total Pemasukan</span>
          </div>
        </div>

        {/* Total Pengeluaran */}
        <div className="flex items-center space-x-5 bg-white rounded-xl shadow-md p-4">
          <div className="bg-red-100 text-red-500 rounded-full p-4 text-xl">
            <FaArrowUp />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">Rp 8.000.000</span>
            <span className="text-gray-500 text-sm">Total Pengeluaran</span>
          </div>
        </div>

        {/* Total Transaksi */}
        <div className="flex items-center space-x-5 bg-white rounded-xl shadow-md p-4">
          <div className="bg-yellow-100 text-yellow-600 rounded-full p-4 text-xl">
            <FaMoneyBillWave />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">35 Transaksi</span>
            <span className="text-gray-500 text-sm">Total Transaksi</span>
          </div>
        </div>
      </div>

      {/* Grafik */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {/* Grafik Garis Pemasukan vs Pengeluaran */}
        <div className="bg-white rounded-xl shadow-md p-4 col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Statistik Keuangan Bulanan
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={statisticData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="Pemasukan"
                stroke="#00C49F"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Pengeluaran"
                stroke="#FF6B6B"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Grafik Pie Distribusi */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Distribusi Keuangan
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={distribusiData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {distribusiData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
