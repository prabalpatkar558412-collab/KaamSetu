import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#050816]/80 backdrop-blur-xl border-b border-cyan-500/10 text-white">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text"
        >
          KaamSetu
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">

          <Link
            to="/jobs"
            className="hover:text-cyan-400 transition"
          >
            Jobs
          </Link>

          <Link
            to="/create-job"
            className="hover:text-cyan-400 transition"
          >
            Create Job
          </Link>

          <Link
            to="/attendance"
            className="hover:text-cyan-400 transition"
          >
            Attendance
          </Link>

          <Link
            to="/chatbot"
            className="hover:text-cyan-400 transition"
          >
            AI Assistant
          </Link>

          {user?.role === "worker" && (
            <Link
              to="/worker-dashboard"
              className="bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-xl font-semibold transition shadow-lg shadow-cyan-500/20"
            >
              Dashboard
            </Link>
          )}

          {user?.role === "contractor" && (
            <Link
              to="/contractor-dashboard"
              className="bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-xl font-semibold transition shadow-lg shadow-cyan-500/20"
            >
              Dashboard
            </Link>
          )}

          {user ? (
            <button
              onClick={logoutHandler}
              className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-xl font-semibold transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-cyan-400 px-4 py-2 rounded-xl hover:bg-cyan-400 hover:text-black transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 px-4 py-2 rounded-xl font-semibold transition"
              >
                Register
              </Link>
            </>
          )}

        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-[#0b1120] border-t border-cyan-500/10 px-6 py-6 flex flex-col gap-5">

          <Link
            to="/jobs"
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-400"
          >
            Jobs
          </Link>

          <Link
            to="/create-job"
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-400"
          >
            Create Job
          </Link>

          <Link
            to="/attendance"
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-400"
          >
            Attendance
          </Link>

          <Link
            to="/chatbot"
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-400"
          >
            AI Assistant
          </Link>

          {user?.role === "worker" && (
            <Link
              to="/worker-dashboard"
              onClick={() => setMenuOpen(false)}
              className="bg-cyan-500 text-center py-3 rounded-xl"
            >
              Dashboard
            </Link>
          )}

          {user?.role === "contractor" && (
            <Link
              to="/contractor-dashboard"
              onClick={() => setMenuOpen(false)}
              className="bg-cyan-500 text-center py-3 rounded-xl"
            >
              Dashboard
            </Link>
          )}

          {user ? (
            <button
              onClick={logoutHandler}
              className="bg-red-500 py-3 rounded-xl"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="border border-cyan-400 text-center py-3 rounded-xl"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-center py-3 rounded-xl"
              >
                Register
              </Link>
            </>
          )}

        </div>
      )}

    </nav>
  );
}