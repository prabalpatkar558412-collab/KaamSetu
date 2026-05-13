import { Link } from "react-router-dom";
import Features from "./Features";
import CTA from "./CTA";
import Stats from "./Stats";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* GLOW EFFECTS */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 z-10">

        <div className="absolute top-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500 opacity-20 blur-3xl rounded-full"></div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
          KaamCall AI
        </h1>

        <p className="max-w-4xl text-base sm:text-lg md:text-2xl text-gray-300 mb-10 leading-relaxed">
          India’s AI-powered instant labour booking platform
          connecting nearby skilled workers and contractors with
          live GPS tracking, one-tap job acceptance, real-time
          monitoring, skill-based matching, and smart ETA routing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">

          <Link
            to="/jobs"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition duration-300 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/20"
          >
            Explore Jobs
          </Link>

          <Link
            to="/chatbot"
            className="border border-cyan-400 hover:bg-cyan-400 hover:text-black transition duration-300 px-8 py-4 rounded-2xl font-bold"
          >
            AI Assistant
          </Link>

        </div>

        {/* PREMIUM FEATURE CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-6xl">

          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-4xl mb-3">📍</h3>

            <h2 className="font-bold text-xl">
              Live GPS Tracking
            </h2>

            <p className="text-gray-300 text-sm mt-2">
              Real-time worker location monitoring.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-4xl mb-3">⚡</h3>

            <h2 className="font-bold text-xl">
              Instant Booking
            </h2>

            <p className="text-gray-300 text-sm mt-2">
              One tap job acceptance like Rapido.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-4xl mb-3">🧠</h3>

            <h2 className="font-bold text-xl">
              AI Skill Matching
            </h2>

            <p className="text-gray-300 text-sm mt-2">
              Workers see only relevant nearby jobs.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-4xl mb-3">🚴</h3>

            <h2 className="font-bold text-xl">
              ETA + Distance
            </h2>

            <p className="text-gray-300 text-sm mt-2">
              Smart nearest-job routing system.
            </p>
          </div>

        </div>

      </section>

      {/* SECTIONS */}
      <Stats />
      <Features />
      <CTA />

    </div>
  );
}