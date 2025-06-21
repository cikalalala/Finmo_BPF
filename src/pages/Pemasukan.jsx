import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

export default function AddIncome() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log({ amount, description, date });
      setLoading(false);
      navigate("/main/Dashboard"); 
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Tambah Pemasukan
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Jumlah (Rp)
          </label>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Contoh: 100000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deskripsi
          </label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Contoh: Gaji Freelance"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tanggal
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
        >
          {loading ? (
            <ImSpinner2 className="animate-spin mr-2" />
          ) : null}
          Simpan
        </button>
      </form>
    </div>
  );
}
