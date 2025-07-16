import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../assets/supabaseClient";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    const { error: dbError } = await supabase.from("users").insert([{
      name: formData.name,
      email: formData.email,
      password: formData.password, // Sebaiknya hash di backend
    }]);

    if (dbError) {
      setError("Pendaftaran berhasil, tapi gagal menyimpan ke database: " + dbError.message);
      return;
    }

    alert("Cek email untuk konfirmasi akun.");
    navigate("/login");
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto p-6 bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">Daftar Akun Finmo</h2>

      {error && (
        <div className="text-red-500 text-center text-sm mb-4">
          {error}
        </div>
      )}

      <input
        type="text"
        name="name"
        placeholder="Nama Lengkap"
        required
        onChange={handleChange}
        className="input input-bordered w-full mb-3"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        className="input input-bordered w-full mb-3"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        onChange={handleChange}
        className="input input-bordered w-full mb-3"
      />

      <button
        type="submit"
        className="w-full py-2 text-white font-semibold rounded-xl 
             bg-gradient-to-r from-blue-500 to-green-500 
             hover:from-blue-600 hover:to-green-600 
             transition-transform hover:scale-[1.02] shadow-md"
      >
        Register
      </button>

      {/* Link masuk */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Masuk
        </Link>
      </p>
    </form>
  );
}
