import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../assets/supabaseClient";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

    // 1. Daftarkan ke Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    // 2. Simpan ke tabel `users`
    const { error: dbError } = await supabase.from("users").insert([
      {
        name: formData.name,
        email: formData.email,
        password: formData.password, // sebaiknya hash ini di backend!
      },
    ]);

    if (dbError) {
      setError(
        "Pendaftaran berhasil, tapi gagal menyimpan ke database: " +
          dbError.message
      );
      return;
    }

    alert("Cek email untuk konfirmasi akun.");
    navigate("/login");
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-sm mx-auto p-4 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
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
      <button type="submit" className="btn btn-primary w-full">
        Register
      </button>
      <div className="flex justify-end mt-4 text-sm">
        <Link to="/login" className="hover:underline text-blue-600">
          Sudah punya Akun?
        </Link>
      </div>
    </form>
  );
}
