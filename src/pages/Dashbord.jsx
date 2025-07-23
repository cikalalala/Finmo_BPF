import {
  FaMoneyBillWave,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaReceipt,
  FaMoneyCheckAlt,
  FaHandHoldingUsd,
  FaSpinner as FaSpinnerer,
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
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../assets/supabaseClient";

import Modal from "../components/Modal";
import Budgeting from "./Budgeting";
import Pemasukan from "./Pemasukan";
import Pengeluaran from "./Pengeluaran";

const COLORS = ["#28a745", "#dc3545"]; // Hijau & Merah

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userId, setUserId] = useState(null);
  const [pemasukan, setPemasukan] = useState([]);
  const [pengeluaran, setPengeluaran] = useState([]);
  const [budgeting, setBudgeting] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const fetchData = useCallback(async (currentUserId) => {
    if (!currentUserId) return;

    const { data: dataMasuk, error: errorMasuk } = await supabase
      .from("pemasukan")
      .select("*")
      .eq("id_pengguna", currentUserId);

    if (errorMasuk) console.error("Error fetching pemasukan:", errorMasuk.message);

    const { data: dataKeluar, error: errorKeluar } = await supabase
      .from("pengeluaran")
      .select("*")
      .eq("id_pengguna", currentUserId);

    if (errorKeluar) console.error("Error fetching pengeluaran:", errorKeluar.message);

    setPemasukan(dataMasuk || []);
    setPengeluaran(dataKeluar || []);
  }, []);

  const fetchBudget = useCallback(async (currentUserId) => {
    if (!currentUserId) return;

    const { data, error } = await supabase
      .from("budgeting")
      .select("*")
      .eq("user_id", currentUserId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = No rows found
      console.error("Error fetching budget:", error.message);
      setBudgeting(null);
    } else if (data) {
      setBudgeting(data);
    } else {
      setBudgeting(null);
    }
  }, []);

  useEffect(() => {
    const fetchUserAndData = async () => {
      setLoadingDashboard(true);
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData?.user?.email) {
        console.error("Authentication error:", authError?.message);
        navigate("/login");
        setLoadingDashboard(false);
        return;
      }

      const { data: userRow, error: userError } = await supabase
        .from("users")
        .select("id, name")
        .eq("email", authData.user.email)
        .single();

      if (userError || !userRow) {
        console.error("User fetch error:", userError?.message);
        navigate("/login");
        setLoadingDashboard(false);
        return;
      }

      setUserName(userRow.name || "User");
      setUserId(userRow.id);
      await fetchData(userRow.id);
      await fetchBudget(userRow.id);
      setLoadingDashboard(false);
    };

    fetchUserAndData();
  }, [navigate, fetchData, fetchBudget]);


  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
    if (userId) {
      fetchData(userId); // Refresh data pemasukan dan pengeluaran
      fetchBudget(userId); // Refresh data budgeting
    }
  };

  const getModalContent = () => {
    switch (modalType) {
      case 'budgeting':
        return <Budgeting onClose={handleCloseModal} />;
      case 'income':
        return <Pemasukan onClose={handleCloseModal} />;
      case 'expense':
        return <Pengeluaran onClose={handleCloseModal} />;
      default:
        return <div>Konten tidak ditemukan.</div>;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'budgeting':
        return 'Pengaturan Budgeting';
      case 'income':
        return 'Tambah Pemasukan';
      case 'expense':
        return 'Tambah Pengeluaran';
      default:
        return 'Detail';
    }
  };

  const totalMasuk = pemasukan.reduce((sum, x) => sum + Number(x.jumlah), 0);
  const totalKeluar = pengeluaran.reduce((sum, x) => sum + Number(x.jumlah), 0);

  const limit = budgeting?.jumlah || 0;
  const durasiBudget = budgeting?.durasi_hari || 0;
  const tanggalMulaiBudget = budgeting?.tanggal_mulai ? new Date(budgeting.tanggal_mulai) : null;
  const hariIni = new Date();

  // Menghitung sisa hari
  let sisaHari = 0;
  if (tanggalMulaiBudget && durasiBudget > 0) {
    const tanggalAkhirBudget = new Date(tanggalMulaiBudget);
    tanggalAkhirBudget.setDate(tanggalMulaiBudget.getDate() + durasiBudget);
    const diffTime = tanggalAkhirBudget.getTime() - hariIni.getTime();
    sisaHari = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (sisaHari < 0) sisaHari = 0; // Pastikan tidak negatif jika sudah lewat
  }

  const pengeluaranSetelahBudgetDiset = pengeluaran.filter(item => {
    if (!tanggalMulaiBudget) return false;
    const tanggalPengeluaran = new Date(item.tanggal);
    // Pastikan tanggal pengeluaran berada dalam periode budget
    const tanggalAkhirBudget = new Date(tanggalMulaiBudget);
    tanggalAkhirBudget.setDate(tanggalMulaiBudget.getDate() + durasiBudget);
    return tanggalPengeluaran >= tanggalMulaiBudget && tanggalPengeluaran <= tanggalAkhirBudget;
  }).reduce((sum, x) => sum + Number(x.jumlah), 0);

  const sisaLimit = limit - pengeluaranSetelahBudgetDiset;

  const totalPemasukan = totalMasuk;
  const totalTransaksi = pengeluaran.length + pemasukan.length;
  const saldoAkhir = totalPemasukan - totalKeluar;

  const statistikKeuangan = generateStatistikKeuangan(pemasukan, pengeluaran, tanggalMulaiBudget);

  const persenTerpakai = limit > 0 ? (pengeluaranSetelahBudgetDiset / limit) * 100 : 0;
  let warnaPeringatan = "emerald";
  if (persenTerpakai >= 75) {
    warnaPeringatan = "rose";
  } else if (persenTerpakai >= 50) {
    warnaPeringatan = "amber";
  }

  if (loadingDashboard) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <FaSpinnerer className="animate-spin text-4xl mr-3" />
        Memuat data dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white px-6 py-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <PageHeader title={`Hi, ${userName} 👋`} />
          {/* Tidak ada lagi tombol notifikasi */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <button onClick={() => handleOpenModal('budgeting')} className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-base">= Budgeting</button>
          <button onClick={() => handleOpenModal('income')} className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-base">+ Income</button>
          <button onClick={() => handleOpenModal('expense')} className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-base">- Expense</button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <SummaryCard
                icon={<FaWallet />}
                color="emerald"
                title={`Rp ${limit.toLocaleString("id-ID")}`}
                subtitle="Budget Limit"
              />
              <SummaryCard
                icon={<FaClock />}
                color="sky"
                title={`${sisaHari} hari`}
                subtitle={`dari ${durasiBudget} hari`}
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

            {persenTerpakai >= 50 && (
              <div className={`p-5 rounded-xl shadow-lg text-white backdrop-blur-sm border border-white/20 ${
                  warnaPeringatan === "rose"
                    ? "bg-gradient-to-r from-rose-500 to-red-500"
                    : "bg-gradient-to-r from-amber-400 to-orange-500"
                }`}>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-semibold">Peringatan!</strong>
                    <span className="ml-2">Budget telah terpakai {persenTerpakai.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            )}

            <ChartCard title="Income & Expense Trends" icon="📈">
              {statistikKeuangan.length === 0 ? (
                <EmptyState message="Atur Uang dengan Durasi!" />
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={statistikKeuangan}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="bulan"
                      tickFormatter={(tick) => {
                        const [year, month] = tick.split("-");
                        const date = new Date(year, month - 1);
                        return date.toLocaleString("en-US", { month: "short", year: "2-digit" });
                      }}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      tickFormatter={(tick) => {
                        if (Math.abs(tick) >= 1_000_000) return `${(tick / 1_000_000).toFixed(1)} JT`;
                        if (Math.abs(tick) >= 1_000) return `${(tick / 1_000).toFixed(1)} RB`;
                        return tick;
                      }}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(val) => [`Rp ${Number(val).toLocaleString("id-ID")}`, ""]}
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Income"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Expense"
                      stroke="#ef4444"
                      strokeWidth={3}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </ChartCard>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
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
                subtitle={saldoAkhir >= 0 ? "Remaining" : "Defisit"}
              />
            </div>

            <ChartCard title="Financial Distribution" icon="📊">
              {totalMasuk === 0 && totalKeluar === 0 ? (
                <EmptyState message="No data available." />
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Income", value: totalMasuk },
                        { name: "Expense", value: totalKeluar }
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={50}
                      paddingAngle={5}
                    >
                      <Cell key="income" fill={COLORS[0]} />
                      <Cell key="expense" fill={COLORS[1]} />
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`Rp ${value.toLocaleString("id-ID")}`, ""]}
                      contentStyle={{
                        backgroundColor: '#00000002',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </ChartCard>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={handleCloseModal}
        title={getModalTitle()}
      >
        {getModalContent()}
      </Modal>

    </div>
  );
}

function PageHeader({ title, children }) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      {children}
    </div>
  );
}

function SummaryCard({ icon, color, title, subtitle }) {
  const colorClasses = {
    emerald: "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 border-emerald-200",
    sky: "bg-gradient-to-br from-sky-50 to-sky-100 text-sky-600 border-sky-200",
    rose: "bg-gradient-to-br from-rose-50 to-rose-100 text-rose-600 border-rose-200",
    amber: "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 border-amber-200",
    violet: "bg-gradient-to-br from-violet-50 to-violet-100 text-violet-600 border-violet-200",
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <div className="p-5 flex items-center gap-4">
        <div className={`${colorClasses[color]} rounded-xl p-3 text-xl border`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-gray-900 truncate">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <div className="text-4xl mb-4">📈</div>
      <p className="text-center text-sm">{message}</p>
    </div>
  );
}

// Fungsi ini tidak digunakan di Dashboard yang baru, tapi saya biarkan untuk kelengkapan
function generateStatistikPengeluaran(pengeluaranData, tanggalMulaiBudget) {
  const stats = {};
  const filtered = pengeluaranData.filter(item => {
    if (!tanggalMulaiBudget) return false;
    const date = new Date(item.tanggal);
    return date >= tanggalMulaiBudget;
  });

  filtered.forEach(item => {
    const date = new Date(item.tanggal);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!stats[key]) stats[key] = { bulan: key, Expense: 0 };
    stats[key].Expense += Number(item.jumlah);
  });

  return Object.values(stats);
}

function generateStatistikKeuangan(pemasukanData, pengeluaranData, tanggalMulaiBudget) {
  const stats = {};
  const pemasukanFilter = pemasukanData.filter(item => {
    if (!tanggalMulaiBudget) return true; // Tidak perlu filter berdasarkan tanggal budget jika tidak ada
    const date = new Date(item.tanggal);
    return date >= tanggalMulaiBudget;
  });

  const pengeluaranFilter = pengeluaranData.filter(item => {
    if (!tanggalMulaiBudget) return true; // Tidak perlu filter berdasarkan tanggal budget jika tidak ada
    const date = new Date(item.tanggal);
    return date >= tanggalMulaiBudget;
  });

  pemasukanFilter.forEach(item => {
    const date = new Date(item.tanggal);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!stats[key]) stats[key] = { bulan: key, Income: 0, Expense: 0 };
    stats[key].Income += Number(item.jumlah);
  });

  pengeluaranFilter.forEach(item => {
    const date = new Date(item.tanggal);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!stats[key]) stats[key] = { bulan: key, Income: 0, Expense: 0 };
    stats[key].Expense += Number(item.jumlah);
  });

  // Urutkan data berdasarkan bulan
  const sortedStats = Object.values(stats).sort((a, b) => {
    return new Date(a.bulan) - new Date(b.bulan);
  });

  return sortedStats;
}