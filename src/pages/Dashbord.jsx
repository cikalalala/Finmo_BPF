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

const statisticData = [
  { name: "Jan", Laptop: 100, TV: 80 },
  { name: "Feb", Laptop: 200, TV: 150 },
  { name: "Mar", Laptop: 150, TV: 180 },
  { name: "Apr", Laptop: 250, TV: 200 },
  { name: "May", Laptop: 200, TV: 220 },
  { name: "Jun", Laptop: 300, TV: 270 }
];

const feedbackData = [
  { name: "Positive", value: 83 },
  { name: "Negative", value: 17 }
];

const COLORS = ["#00C49F", "#FF8042"];

export default function Dashboard() {
  return (
    <div id="dashboard-container" className="px-5 py-6">
      {/* Header Page */}
      <PageHeader title="Dashboard" breadcrumb={["Home", "Dashboard"]}>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          + Tambah Catatan
        </button>
      </PageHeader>

      {/* Summary Cards */}
      <div
        id="dashboard-grid"
        className="grid sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
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
            <span className="text-2xl font-bold">Rp 2.500.000</span>
            <span className="text-gray-500 text-sm">Total Pemasukan</span>
          </div>
        </div>

        {/* Total Pengeluaran */}
        <div className="flex items-center space-x-5 bg-white rounded-xl shadow-md p-4">
          <div className="bg-red-100 text-red-500 rounded-full p-4 text-xl">
            <FaArrowUp />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">Rp 1.200.000</span>
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
        {/* Statistik Chart */}
        <div className="bg-white rounded-xl shadow-md p-4 col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Statistik</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={statisticData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Laptop" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="TV" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart Feedback */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Customer Feedback</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={feedbackData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {feedbackData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
