import { useState, useEffect } from "react";
import { supabase } from "../assets/supabaseClient";

export default function History() {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // filter states
  const [jenisTransaksi, setJenisTransaksi] = useState("Semua");
  const [subKategori, setSubKategori] = useState("Semua");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) {
        alert("Autentikasi gagal. Silakan login ulang.");
        return;
      }

      const email = authData.user.email;
      const { data: userRow } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      const userId = userRow.id;
      setUserId(userId);

      const { data: pemasukan } = await supabase
        .from("pemasukan")
        .select("*")
        .eq("id_pengguna", userId);

      const { data: pengeluaran } = await supabase
        .from("pengeluaran")
        .select("*")
        .eq("id_pengguna", userId);

      const combined = [
        ...(pemasukan || []).map((item) => ({ ...item, jenis: "Pemasukan" })),
        ...(pengeluaran || []).map((item) => ({
          ...item,
          jenis: "Pengeluaran",
        })),
      ];

      setHistory(combined);
      setFilteredHistory(combined); // default
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...history];

    // Filter Jenis
    if (jenisTransaksi !== "Semua") {
      filtered = filtered.filter((item) => item.jenis === jenisTransaksi);
    }

    // Filter Subkategori
    if (subKategori !== "Semua") {
      filtered = filtered.filter((item) => item.kategori === subKategori);
    }

    // Filter Tanggal
    if (dateFilter !== "all") {
      const now = new Date();
      const days = dateFilter === "7" ? 7 : dateFilter === "30" ? 30 : 90;
      const pastDate = new Date(now.setDate(now.getDate() - days));
      filtered = filtered.filter((item) => new Date(item.tanggal) >= pastDate);
    }

    // Sort
    filtered.sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.tanggal) - new Date(a.tanggal)
        : new Date(a.tanggal) - new Date(b.tanggal)
    );

    setFilteredHistory(filtered);
  }, [jenisTransaksi, subKategori, dateFilter, sortOrder, history]);

  // Ambil subkategori dinamis berdasarkan jenis transaksi
  const getSubKategoriList = () => {
    return [
      "Semua",
      ...new Set(
        history
          .filter(
            (item) =>
              jenisTransaksi === "Semua" || item.jenis === jenisTransaksi
          )
          .map((item) => item.kategori)
      ),
    ];
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Riwayat Transaksi
      </h2>

      {/* Filter */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mb-6">
        {/* Jenis */}
        <div>
          <label className="text-sm text-gray-600">Jenis Transaksi</label>
          <select
            className="border p-2 rounded-md w-full"
            value={jenisTransaksi}
            onChange={(e) => {
              setJenisTransaksi(e.target.value);
              setSubKategori("Semua");
            }}
          >
            <option value="Semua">Semua</option>
            <option value="Pemasukan">Pemasukan</option>
            <option value="Pengeluaran">Pengeluaran</option>
          </select>
        </div>

        {/* Subkategori */}
        <div>
          <label className="text-sm text-gray-600">Kategori</label>
          <select
            className="border p-2 rounded-md w-full"
            value={subKategori}
            onChange={(e) => setSubKategori(e.target.value)}
          >
            {getSubKategoriList().map((kat, i) => (
              <option key={i} value={kat}>
                {kat}
              </option>
            ))}
          </select>
        </div>

        {/* Tanggal */}
        <div>
          <label className="text-sm text-gray-600">Waktu</label>
          <select
            className="border p-2 rounded-md w-full"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">Semua</option>
            <option value="7">7 Hari Terakhir</option>
            <option value="30">30 Hari Terakhir</option>
            <option value="90">90 Hari Terakhir</option>
          </select>
        </div>

        {/* Urutan */}
        <div>
          <label className="text-sm text-gray-600">Urutkan</label>
          <select
            className="border p-2 rounded-md w-full"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Terbaru</option>
            <option value="asc">Terlama</option>
          </select>
        </div>
      </div>

      {/* History List */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredHistory.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada transaksi ditemukan.
        </p>
      ) : (
        <ul className="space-y-4">
          {filteredHistory.map((item, index) => (
            <li
              key={index}
              className={`flex justify-between items-center border p-4 rounded-lg ${
                item.jenis === "Pemasukan" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <div>
                <p className="font-medium">{item.kategori}</p>
                <p className="text-sm text-gray-600">{item.deskripsi}</p>
                <p className="text-xs text-gray-500">{item.tanggal}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">
                  {item.jenis === "Pemasukan" ? "+" : "-"} Rp
                  {item.jumlah.toLocaleString()}
                </p>
                <p className="text-xs">{item.jenis}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
