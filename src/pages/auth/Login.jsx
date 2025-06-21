import { ImSpinner2 } from "react-icons/im";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      });

      if (res.status === 200) {
        navigate("/main");
      } else {
        setError(res.data.message || "Login gagal.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-8 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Masuk ke FinMo</h1>

      {error && (
        <div className="flex items-center gap-2 text-sm bg-red-100 text-red-700 p-3 rounded mb-4">
          <BsFillExclamationDiamondFill />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            autoComplete="username"
            placeholder="you@example.com"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="********"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full flex justify-center items-center gap-2 ${
            loading ? "btn-disabled" : ""
          }`}
        >
          {loading ? (
            <>
              <ImSpinner2 className="animate-spin" />
              Masuk...
            </>
          ) : (
            "Masuk"
          )}
        </button>
      </form>

      <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
        <Link to="/forgot" className="hover:underline text-blue-600">
          Lupa Password?
        </Link>
        <Link to="/register" className="hover:underline text-blue-600">
          Daftar Akun
        </Link>
      </div>
    </div>
  );
}
