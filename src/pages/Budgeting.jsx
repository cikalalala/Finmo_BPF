import { useEffect, useState } from "react";
import { AlertTriangle, Wallet, CalendarCheck, RotateCcw } from "lucide-react";
import supabase from "../lib/supabase";

const Budgeting = () => {
  const [jumlah, setJumlah] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState(""); // Ini tetap untuk input type="date"
  const [durasiOption, setDurasiOption] = useState("");
  const [customDurasi, setCustomDurasi] = useState("");
  const [userId, setUserId] = useState(null);
  const [isActiveBudgeting, setIsActiveBudgeting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserIdAndCheckBudget = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Failed to get session:", sessionError.message);
        navigate("/login");
        return;
      }

      const email = session?.user?.email;
      if (!email) {
        console.error("Email not found in session.");
        navigate("/login");
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      if (userError || !userData) {
        console.error("Invalid user ID:", userError?.message);
        navigate("/login");
      } else {
        setUserId(userData.id);

        // Check if there's an active budget
        const { data: budgetData, error: budgetError } = await supabase
          .from("budgeting")
          .select("*")
          .eq("user_id", userData.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (budgetError && budgetError.code !== 'PGRST116') {
          console.error("Error fetching budget:", budgetError);
        }

        if (budgetData) {
          const startDate = new Date(budgetData.tanggal_mulai);
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + budgetData.durasi_hari);

          if (new Date() < endDate) {
            setIsActiveBudgeting(true);
            return;
          }
        }
        setShowForm(true);
      }
    };

    getUserIdAndCheckBudget();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) return alert("User ID not ready");
    if (!jumlah || parseFloat(jumlah) <= 0 || isNaN(parseFloat(jumlah)))
      return alert("Masukkan jumlah yang valid");

    let durasiFinal =
      durasiOption === "custom"
        ? parseInt(customDurasi)
        : parseInt(durasiOption);

    if (!durasiFinal || durasiFinal <= 0 || isNaN(durasiFinal))
      return alert("Durasi tidak valid");

    // Perbaikan: Anda ingin tanggal mulai budget adalah TANGGAL SAAT TOMBOL SIMPAN DIKLIK
    // Jika tidak ada input tanggalMulai dari user, gunakan waktu saat ini
    // Jika ada, gunakan tanggal yang dipilih user tapi dengan waktu saat ini
    // Atau, cara paling sederhana dan akurat untuk filtering: selalu gunakan waktu saat ini
    
    // Pilihan 1 (paling direkomendasikan untuk filtering "setelah budget dibuat"):
    // Gunakan waktu saat ini untuk tanggal_mulai budget
    const finalTanggalMulai = new Date().toISOString(); 
    
    // Pilihan 2 (jika Anda ingin tanggalnya sesuai input user, tapi waktunya tetap 00:00:00 jika input type="date"):
    // const finalTanggalMulai = tanggalMulai ? new Date(tanggalMulai).toISOString() : new Date().toISOString(); 
    // ^ Ini akan tetap menghasilkan 'YYYY-MM-DD 00:00:00' jika inputnya hanya dari type="date"

    // Pilihan 3 (menggabungkan tanggal input dengan waktu saat ini) - ini agak kompleks jika inputnya hanya 'date'
    // const chosenDate = new Date(tanggalMulai);
    // const now = new Date();
    // chosenDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    // const finalTanggalMulai = chosenDate.toISOString();


    try {
      // Hapus budget sebelumnya untuk pengguna ini (sesuai logika Anda)
      await supabase.from("budgeting").delete().eq("user_id", userId);

      // Simpan budget baru
      const { error } = await supabase.from("budgeting").insert([
        {
          user_id: userId,
          jumlah: parseFloat(jumlah),
          tanggal_mulai: finalTanggalMulai, // <--- GUNAKAN VARIABEL YANG SUDAH DITENTUKAN
          durasi_hari: durasiFinal,
        },
      ]);

      if (error) throw error;

      alert("Budget berhasil disimpan!");
      navigate("/main/Dashboard");
    } catch (error) {
      alert(`Gagal menyimpan: ${error.message}`);
    }
  };

  const handleReset = async () => {
    try {
      if (!userId) {
        alert("User ID tidak ditemukan. Coba refresh halaman.");
        return;
      }
      await supabase.from("budgeting").delete().eq("user_id", userId);
      setIsActiveBudgeting(false);
      setShowForm(true);
      alert("Budget sebelumnya berhasil dihapus. Silakan isi ulang.");
    } catch (error) {
      alert(`Gagal reset: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
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
            >
              Reset Budgeting
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-md transition duration-300"
            >
              Kembali
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Budgeting Form
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
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Tanggal Mulai</label>
              <input
                type="date"
                value={tanggalMulai} // Tetap ambil nilai dari input date
                onChange={(e) => setTanggalMulai(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Durasi (hari)</label>
              <select
                value={durasiOption}
                onChange={(e) => setDurasiOption(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
            >
              Simpan Budget
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Budgeting;