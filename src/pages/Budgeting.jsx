import { useEffect, useState } from "react";
import { AlertTriangle, Wallet, CalendarCheck, RotateCcw } from "lucide-react";


export default function Budgeting() {
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("7");
  const [customDuration, setCustomDuration] = useState("");
  const [canReset, setCanReset] = useState(false);
  const [sisaHari, setSisaHari] = useState(null);
  const [warning, setWarning] = useState("");
  const [budgetData, setBudgetData] = useState(null);

  useEffect(() => {
    const fetchBudget = async () => {
      const { data, error } = await supabase
        .from("budgeting")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Gagal ambil budgeting:", error);
        return;
      }

      if (data) {
        setBudgetData(data);
        const start = new Date(data.start_date);
        const now = new Date();
        const selisihHari = Math.floor((now - start) / (1000 * 60 * 60 * 24));

        if (selisihHari < data.duration) {
          setCanReset(true);
          setSisaHari(data.duration - selisihHari);

          const pengeluaranHariIni = 200000; // dummy dulu
          const batasHarian = data.budget / data.duration;
          if (pengeluaranHariIni > batasHarian * 0.5) {
            setWarning("⚠️ Pengeluaran hari ini melebihi 50% dari batas harian.");
          } else {
            setWarning("");
          }
        } else {
          setCanReset(false);
          setSisaHari(0);
        }
      }
    };

    fetchBudget();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const durasiFix =
      duration === "custom" ? parseInt(customDuration) : parseInt(duration);

    const { error } = await supabase.from("budgeting").insert([
      {
        budget: parseInt(budget),
        duration: durasiFix,
        start_date: new Date().toISOString(),
      },
    ]);

    if (error) {
      alert("❌ Gagal menyimpan budget.");
      console.error(error);
      return;
    }

    alert("✅ Budget berhasil disimpan!");
    window.location.reload();
  };

  const handleReset = async () => {
    if (confirm("Yakin ingin mereset budgeting sekarang?")) {
      if (!budgetData?.id) return;
      const { error } = await supabase
        .from("budgeting")
        .delete()
        .eq("id", budgetData.id);

      if (error) {
        alert("❌ Gagal reset budget.");
        console.error(error);
        return;
      }

      alert("🔄 Budget berhasil di-reset!");
      window.location.reload();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-10 space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <Wallet className="w-7 h-7 text-blue-600" />
        Atur Budget
      </h2>

      {sisaHari !== null && (
        <div className="flex items-center gap-2 text-gray-700 text-sm bg-gray-100 p-3 rounded-lg">
          <CalendarCheck className="w-5 h-5 text-green-600" />
          <span>
            <strong>Budget aktif:</strong> masih berlaku selama {sisaHari} hari lagi.
          </span>
        </div>
      )}

      {warning && (
        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 p-3 rounded-md text-sm">
          <AlertTriangle className="w-5 h-5" />
          {warning}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Jumlah Budget (Rp)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            className="input input-bordered w-full"
            placeholder="Contoh: 1000000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Durasi</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="7">7 Hari</option>
            <option value="14">14 Hari</option>
            <option value="30">30 Hari</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {duration === "custom" && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Durasi Custom (hari)
            </label>
            <input
              type="number"
              value={customDuration}
              onChange={(e) => setCustomDuration(e.target.value)}
              min="1"
              required
              className="input input-bordered w-full"
              placeholder="Contoh: 10"
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Simpan Budget
        </button>
      </form>

      {canReset && (
        <button
          type="button"
          onClick={handleReset}
          className="btn btn-outline btn-error w-full flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Reset Budget
        </button>
      )}
    </div>
  );
}
