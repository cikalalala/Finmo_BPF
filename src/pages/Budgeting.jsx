import { useEffect, useState } from "react";
import { supabase } from "../assets/supabaseClient";
import { ImSpinner2 as FaSpinner } from "react-icons/im"; // Menggunakan FaSpinner untuk loading

// Menerima prop 'onClose' dari Dashboard
const Budgeting = ({ onClose }) => {
  const [jumlah, setJumlah] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [durasiOption, setDurasiOption] = useState("");
  const [customDurasi, setCustomDurasi] = useState("");
  const [userId, setUserId] = useState(null); // userId dipertahankan sebagai state lokal
  const [isActiveBudgeting, setIsActiveBudgeting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true); // Tambahkan state loading lokal

  useEffect(() => {
    const getUserIdAndCheckBudget = async () => {
      setLoading(true); // Mulai loading
      // --- Logika pengambilan userId dikembalikan ---
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        console.error("Failed to get session for Budgeting:", sessionError?.message || "No session");
        alert("Sesi tidak ditemukan. Silakan login ulang atau refresh halaman.");
        onClose(); // Tutup modal jika sesi tidak ada
        setLoading(false);
        return;
      }

      const email = session?.user?.email;
      if (!email) {
        console.error("Email not found in session for Budgeting.");
        alert("Informasi pengguna tidak lengkap. Silakan login ulang atau refresh halaman.");
        onClose(); // Tutup modal jika email tidak ada
        setLoading(false);
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      if (userError || !userData) {
        console.error("Invalid user ID in Budgeting:", userError?.message || "User data not found");
        alert("Pengguna tidak terdaftar. Silakan login ulang.");
        onClose(); // Tutup modal jika user tidak ditemukan di tabel
        setLoading(false);
        return;
      } else {
        setUserId(userData.id);

        // --- Logika pengecekan budget aktif dikembalikan ---
        const { data: budgetData, error: budgetError } = await supabase
          .from("budgeting")
          .select("*")
          .eq("user_id", userData.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (budgetError && budgetError.code !== 'PGRST116') { // PGRST116 berarti "data not found"
          console.error("Error fetching budget in Budgeting:", budgetError);
        }

        if (budgetData) {
          const startDate = new Date(budgetData.tanggal_mulai);
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + budgetData.durasi_hari);

          if (new Date() < endDate) {
            setIsActiveBudgeting(true);
            // Isi form dengan data budget yang aktif (opsional, untuk tampilan)
            setJumlah(budgetData.jumlah.toString()); // Pastikan string untuk input
            // Mengambil tanggal saja dari ISO string
            setTanggalMulai(budgetData.tanggal_mulai.split('T')[0]);
            setDurasiOption(String(budgetData.durasi_hari));
            setShowForm(false); // Sembunyikan form jika budget aktif
            setLoading(false);
            return;
          }
        }
        setShowForm(true); // Tampilkan form jika tidak ada budget aktif
        setLoading(false);
      }
    };

    getUserIdAndCheckBudget();
  }, [onClose]); // Depend on onClose for safety, but userId is fetched inside

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mulai loading saat submit

    if (!userId) {
      alert("User ID belum tersedia. Silakan tunggu atau coba refresh.");
      setLoading(false);
      return;
    }
    if (!jumlah || parseFloat(jumlah) <= 0 || isNaN(parseFloat(jumlah))) {
      alert("Masukkan jumlah yang valid");
      setLoading(false);
      return;
    }

    let durasiFinal =
      durasiOption === "custom"
        ? parseInt(customDurasi)
        : parseInt(durasiOption);

    if (!durasiFinal || durasiFinal <= 0 || isNaN(durasiFinal)) {
      alert("Durasi tidak valid");
      setLoading(false);
      return;
    }

    // Menggabungkan tanggal dari input dengan waktu saat ini saat submit
    const chosenDate = new Date(tanggalMulai);
    const now = new Date();
    chosenDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    const finalTanggalMulai = chosenDate.toISOString();


    try {
      // Hapus budget sebelumnya untuk pengguna ini (sesuai logika Anda)
      // Ini dilakukan jika Anda selalu ingin hanya ada 1 budget aktif per user
      await supabase.from("budgeting").delete().eq("user_id", userId);

      // Simpan budget baru
      const { error } = await supabase.from("budgeting").insert([
        {
          user_id: userId,
          jumlah: parseFloat(jumlah),
          tanggal_mulai: finalTanggalMulai,
          durasi_hari: durasiFinal,
        },
      ]);

      if (error) throw error;

      alert("Budget berhasil disimpan!");
      onClose(); // Tutup modal dan picu refresh di Dashboard
    } catch (error) {
      alert(`Gagal menyimpan: ${error.message}`);
    } finally {
      setLoading(false); // Akhiri loading
    }
  };

  const handleReset = async () => {
    setLoading(true); // Mulai loading saat reset
    try {
      if (!userId) {
        alert("User ID tidak ditemukan. Coba refresh halaman.");
        setLoading(false);
        return;
      }
      const { error } = await supabase.from("budgeting").delete().eq("user_id", userId);

      if (error) throw error;

      alert("Budget sebelumnya berhasil dihapus. Silakan isi ulang.");
      // Reset state form setelah reset
      setJumlah("");
      setTanggalMulai(""); // Kosongkan tanggalMulai
      setDurasiOption("");
      setCustomDurasi("");
      setIsActiveBudgeting(false);
      setShowForm(true); // Tampilkan form setelah reset
      onClose(); // Tutup modal setelah reset berhasil
    } catch (error) {
      alert(`Gagal reset: ${error.message}`);
    } finally {
      setLoading(false); // Akhiri loading
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <FaSpinner className="animate-spin text-4xl mr-3 text-blue-500" />
        Memuat data budget...
      </div>
    );
  }

  return (
    // Styling div utama hanya padding dan rounded/shadow agar bisa diatur oleh Modal
    <div className="bg-white p-6 rounded-xl shadow-md">
      {isActiveBudgeting && !showForm ? (
        <div className="text-center">
          <p className="mb-4 text-red-600 font-semibold">
            ❗ Kamu masih punya budgeting yang aktif.
            <br />
            Harap reset dulu sebelum buat yang baru.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
              disabled={loading} // Disable saat loading
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Reset Budgeting"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Atur Budgeting
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Jumlah</label>
              <input
                type="number"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                required
                min="1"
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading} // Disable saat loading
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Tanggal Mulai</label>
              <input
                type="date"
                value={tanggalMulai}
                onChange={(e) => setTanggalMulai(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading} // Disable saat loading
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Durasi (hari)</label>
              <select
                value={durasiOption}
                onChange={(e) => setDurasiOption(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading} // Disable saat loading
              >
                <option value="">Pilih durasi</option>
                <option value="7">7 hari</option>
                <option value="14">14 hari</option>
                <option value="30">30 hari</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            {durasiOption === "custom" && (
              <div>
                <label className="block mb-1 font-medium">
                  Durasi Custom (hari)
                </label>
                <input
                  type="number"
                  value={customDurasi}
                  onChange={(e) => setCustomDurasi(e.target.value)}
                  required
                  min="1"
                  className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={loading} // Disable saat loading
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
              disabled={loading} // Disable saat loading
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Simpan Budget"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Budgeting;