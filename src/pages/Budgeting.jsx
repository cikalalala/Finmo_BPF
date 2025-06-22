import { useEffect, useState } from "react";
import { supabase } from "../assets/supabaseClient";

const Budgeting = () => {
  const [jumlah, setJumlah] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [durasiOption, setDurasiOption] = useState("");
  const [customDurasi, setCustomDurasi] = useState("");
  const [userId, setUserId] = useState(null);

  // Get user ID from session
  useEffect(() => {
    const getUserId = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Failed to get session:", sessionError.message);
        return;
      }

      const email = session?.user?.email;
      if (!email) {
        console.error("Email not found in session.");
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      if (userError || !userData) {
        console.error("Invalid user ID:", userError?.message);
      } else {
        setUserId(userData.id);
      }
    };

    getUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!userId) {
      alert("User ID not ready");
      return;
    }

    if (!jumlah || jumlah <= 0 || isNaN(jumlah)) {
      alert("Please enter a valid amount (greater than 0)");
      return;
    }

    let durasiFinal = durasiOption === "custom" 
      ? parseInt(customDurasi) 
      : parseInt(durasiOption);

    if (!durasiFinal || durasiFinal <= 0 || isNaN(durasiFinal)) {
      alert("Please enter valid duration (greater than 0 days)");
      return;
    }

    if (!tanggalMulai) {
      alert("Please select start date");
      return;
    }

    try {
      // Delete existing budget first
      const { error: deleteError } = await supabase
        .from('budgeting')
        .delete()
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      // Insert new budget
      const { error } = await supabase.from("budgeting").insert([
        {
          user_id: userId,
          jumlah: parseFloat(jumlah),
          tanggal_mulai: tanggalMulai,
          durasi_hari: durasiFinal,
        },
      ]);

      if (error) throw error;

      alert("Budget saved successfully!");
      setJumlah("");
      setTanggalMulai("");
      setDurasiOption("");
      setCustomDurasi("");
      window.location.href = "/main/Dashboard";
    } catch (error) {
      console.error("Error saving budget:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Budgeting Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Amount</label>
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
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            value={tanggalMulai}
            onChange={(e) => setTanggalMulai(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Duration (days)</label>
          <select
            value={durasiOption}
            onChange={(e) => setDurasiOption(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select duration</option>
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="30">30 days</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        {durasiOption === "custom" && (
          <div>
            <label className="block mb-1 font-medium">Custom duration (days)</label>
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
          Save Budget
        </button>
      </form>
    </div>
  );
};

export default Budgeting;