import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuthStore();

  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    login(nim, password);

    const auth = useAuthStore.getState();

    if (auth.isLogin) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Event Management System
        </h1>

        {/* INFO LOGIN */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm">
          <p className="font-semibold text-blue-700 mb-2">
          </p>
          <p>
            NIM: <span className="font-bold">24090107</span>
          </p>
          <p>
            Password: <span className="font-bold">admin123</span>
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* NIM */}
          <input
            type="text"
            placeholder="Masukkan NIM"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-400 text-xs mt-6">
          UTS Fullstack Event Management System
        </p>

      </div>
    </div>
  );
};

export default LoginPage;