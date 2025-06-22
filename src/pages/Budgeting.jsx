// src/pages/Budgeting.jsx

import { useEffect, useState } from "react";
import { AlertTriangle, Wallet, CalendarCheck, RotateCcw } from "lucide-react";

export default function Budgeting() {
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("7");
  const [customDuration, setCustomDuration] = useState("");
  const [canReset, setCanReset] = useState(false);
  const [sisaHari, setSisaHari] = useState(null);
  const [warning, setWarning] = useState("");
  const [pengeluaranHariIni, setPengeluaranHariIni] = useState(0);

  useEffect(() => {
    const budgeting = JSON.parse(localStorage.getItem("budgetingData"));

    if (budgeting) {
      const start = new Date(budgeting.startDate);
      const now = new Date();
      const selisihHari = Math.floor((now - start) / (1000 * 60 * 60 * 24));

      if (selisihHari < budgeting.duration) {
        setCanReset(true);
        setSisaHari(budgeting.duration - selisihHari);

        const dummyHariIni = 200000; // dummy
        setPengeluaranHariIni(dummyHariIni);

        const batasHarian = budgeting.budget / budgeting.duration;
        if (dummyHariIni > batasHarian * 0.5) {
          setWarning("⚠️ Pengeluaran hari ini melebihi 50% dari batas harian.");
        } else {
          setWarning("");
        }
      } else {
        setCanReset(false);
        setSisaHari(0);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const durasiFix =
      duration === "custom" ? parseInt(customDuration) : parseInt(duration);

    const dataToSave = {
      budget: parseInt(budget),
      duration: durasiFix,
      startDate: new Date().toISOString(),
    };

    localStorage.setItem("budgetingData", JSON.stringify(dataToSave));
    alert("✅ Budget berhasil disimpan!");
    window.location.reload();
  };

  const handleReset = () => {
    if (confirm("Yakin ingin mereset budgeting sekarang?")) {
      localStorage.removeItem("budgetingData");
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
