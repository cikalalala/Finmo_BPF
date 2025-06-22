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

import statisticData from "../data/statistik.json";
import distribusiData from "../data/distribusi.json";

const COLORS = ["#8e44ad", "#f1c40f"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Pengguna");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
    } else {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || "Pengguna");
      } catch (err) {
        console.error("Failed to parse user:", err);
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <div className="px-5 py-6 space-y-6">
      <PageHeader title={`Hi, ${userName}`}>
        <div className="grid grid-cols-3 gap-2 w-full">
          <button
            className="btn btn-primary w-full"
            onClick={() => navigate("/main/Dashboard/pemasukan")}
          >
            + Pemasukan
          </button>
          <button
            className="btn btn-primary w-full"
            onClick={() => navigate("/main/Dashboard/pengeluaran")}
          >
            - Pengeluaran
          </button>
          <button
            className="btn btn-primary w-full"
            onClick={() => navigate("/main/Dashboard/budgeting")}
          >
            = Budgeting
          </button>
        </div>
      </PageHeader>

      {/* Ringkasan Keuangan */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Saldo Akhir */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body flex-row items-center gap-4">
            <div className="bg-green-100 text-green-600 rounded-full p-4 text-xl">
              <FaWallet />
            </div>
            <div>
              <h2 className="text-xl font-bold">Rp 1.300.000</h2>
              <p className="text-sm text-green-500">Saldo Akhir</p>
            </div>
          </div>
        </div>

        {/* Total Pemasukan */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body flex-row items-center gap-4">
            <div className="bg-blue-100 text-blue-600 rounded-full p-4 text-xl">
              <FaArrowDown />
            </div>
            <div>
              <h2 className="text-xl font-bold">Rp 15.000.000</h2>
              <p className="text-sm text-gray-500">Total Pemasukan</p>
            </div>
          </div>
        </div>

        {/* Total Pengeluaran */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body flex-row items-center gap-4">
            <div className="bg-red-100 text-red-500 rounded-full p-4 text-xl">
              <FaArrowUp />
            </div>
            <div>
              <h2 className="text-xl font-bold">Rp 8.000.000</h2>
              <p className="text-sm text-green-500">Total Pengeluaran</p>
            </div>
          </div>
        </div>

        {/* Total Transaksi */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body flex-row items-center gap-4">
            <div className="bg-yellow-100 text-yellow-600 rounded-full p-4 text-xl">
              <FaMoneyBillWave />
            </div>
            <div>
              <h2 className="text-xl font-bold">35 Transaksi</h2>
              <p className="text-sm text-green-500">Total Transaksi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistik dan Distribusi */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Statistik Keuangan Bulanan */}
        <div className="card bg-base-100 shadow-md md:col-span-2">
          <div className="card-body">
            <h2 className="card-title text-green-700">
              Statistik Keuangan Bulanan
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={statisticData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `Rp ${value.toLocaleString()}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Pemasukan"
                  stroke="#8e44ad"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Pengeluaran"
                  stroke="#f1c40f"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribusi Keuangan */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-green-700">Distribusi Keuangan</h2>
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
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
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
