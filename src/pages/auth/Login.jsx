import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // pastikan Link diimport
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
      setError("Login berhasil, tapi gagal ambil data pengguna: " + dbError.message);
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/main");
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
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
      <button type="submit" className="btn btn-primary w-full">Login</button>

      {/* NOTE: Tambahan link di bawah */}
      <div className="flex justify-between text-sm text-gray-600 mt-4">
        <Link to="/forgot" className="hover:underline text-blue-600">
          Lupa Password?
        </Link>
        <Link to="/register" className="hover:underline text-blue-600">
          Daftar Akun
        </Link>
      </div>
    </form>
  );
}
