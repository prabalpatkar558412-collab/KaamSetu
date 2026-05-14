import { Link } from "react-router-dom";
import Features from "./Features";
import CTA from "./CTA";
import Stats from "./Stats";
import ok from "../assets/ok.jpeg";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_35%)]"></div>

      {/* GLOW EFFECTS */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

      {/* HERO SECTION */}
      <section className="relative px-6 py-24 md:py-32 z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE */}
          <div className="text-center md:text-left">
            <div className="inline-flex mb-5 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl text-cyan-300 text-sm font-semibold shadow-lg">
              AI Powered Labour Booking Platform
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(34,211,238,0.25)]">
              KaamSetu
            </h1>

            <p className="max-w-2xl text-base sm:text-lg md:text-2xl text-gray-300 mb-10 leading-relaxed">
              India’s AI-powered instant labour booking platform
              connecting nearby skilled workers and contractors with
              live GPS tracking, one-tap job acceptance, real-time
              monitoring, skill-based matching, and smart ETA routing.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/jobs"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 hover:shadow-cyan-500/40 transition duration-300 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/20"
              >
                Find Jobs
              </Link>

              <Link
                to="/chatbot"
                className="border border-cyan-400 bg-white/5 backdrop-blur-xl hover:bg-cyan-400 hover:text-black hover:scale-105 transition duration-300 px-8 py-4 rounded-2xl font-bold"
              >
                AI Assistant
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative flex justify-center items-center">
            
            {/* IMAGE GLOW */}
            <div className="absolute w-[450px] h-[300px] bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>

            {/* FLOATING CARDS */}
            <div className="absolute top-6 right-6 z-20 px-4 py-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-2xl">
              <p className="text-cyan-300 font-bold text-sm">97% Match</p>
              <p className="text-gray-300 text-xs">AI Skill Matching</p>
            </div>

            <div className="absolute bottom-6 left-6 z-20 px-4 py-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-2xl">
              <p className="text-green-300 font-bold text-sm">2.4 km</p>
              <p className="text-gray-300 text-xs">Nearby Job</p>
            </div>

            {/* IMAGE CONTAINER */}
            <div className="relative z-10 w-full max-w-2xl aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,0.25)] hover:scale-105 transition duration-500">

              <img
                src={ok}
                alt="KaamSetu"
                className="w-full h-full object-cover object-center"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full max-w-6xl mx-auto">
          
          {/* CARD 1 */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl hover:scale-105 hover:border-cyan-400/50 hover:bg-white/15 transition duration-300">
            <h3 className="text-4xl mb-3">📍</h3>

            <h2 className="font-bold text-xl">
              Live GPS Tracking
            </h2>

            <p className="text-gray-300 text-sm mt-2">
              Real-time worker location monitoring.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl hover:scale-105 hover:border-cyan-400/50 hover:bg-white/15 transition duration-300">
            <h3 className="text-4xl mb-3">⚡</h3>

            <h2 className="font-bold text-xl">
              Instant Booking
            </h2>

            <p className="text-gray-300 text-sm mt-2">
              One tap job acceptance like Rapido.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl hover:scale-105 hover:border-cyan-400/50 hover:bg-white/15 transition duration-300">
            <h3 className="text-4xl mb-3">🧠</h3>

            <h2 className="font-bold text-xl">
              AI Skill Matching
            </h2>

            <p className="text-gray-300 text-sm mt-2">
              Workers see only relevant nearby jobs.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl hover:scale-105 hover:border-cyan-400/50 hover:bg-white/15 transition duration-300">
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

      {/* OTHER SECTIONS */}
      <Stats />
      <Features />
      <CTA />
    </div>
  );
}