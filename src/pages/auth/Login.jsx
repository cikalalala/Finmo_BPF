import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../assets/supabaseClient";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    const { data: userData, error: dbError } = await supabase
      .from("users")
      .select("*")
      .eq("email", formData.email)
      .single();

    if (dbError) {
      setError("Login berhasil, tetapi gagal mengambil data pengguna: " + dbError.message);
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/main/Dashboard");
  };

  return (
    <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto p-6 bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-5 text-center">Masuk ke Finmo</h2>

      {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

      <div className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full mt-6 hover:scale-[1.02] transition-transform"
      >
        Login
      </button>

      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <Link to="/forgot" className="hover:underline text-blue-600">Lupa Password?</Link>
        <Link to="/register" className="hover:underline text-blue-600">Daftar Akun</Link>
      </div>

    </form>
  );
}
