import { Link, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaList,
  FaMicrophone,
  FaCalendar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuthStore } from "../store/authStore";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({
  children,
}: Props) => {

  const navigate = useNavigate();

  const { logout } =
    useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}

      <div className="w-250px bg-gradient-to-b from-blue-600 to-purple-600 text-white p-5 shadow-xl">

        <h1 className="text-2xl font-bold mb-10">
          Event App
        </h1>

        <div className="flex flex-col gap-3">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition"
          >
            <FaHome />
            Dashboard
          </Link>

          <Link
            to="/categories"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition"
          >
            <FaList />
            Categories
          </Link>

          <Link
            to="/pembicara"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition"
          >
            <FaMicrophone />
            Pembicara
          </Link>

          <Link
            to="/events"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition"
          >
            <FaCalendar />
            Events
          </Link>

          <Link
            to="/biodata"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition"
          >
            <FaUser />
            Biodata
          </Link>

        </div>

        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-3 bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl w-full justify-center"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

      {/* CONTENT */}

      <div className="flex-1">

        {/* NAVBAR */}

        <div className="bg-white shadow-md p-5 flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Event Management System
          </h1>

          <div className="font-semibold">
            Welcome Admin
          </div>

        </div>

        {/* PAGE CONTENT */}

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
};

export default MainLayout;