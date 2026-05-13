import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="px-6 pb-28 relative z-10">

      <div className="max-w-6xl mx-auto bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/20 backdrop-blur-2xl rounded-[40px] p-10 md:p-16 text-center shadow-2xl">

        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">

          Empowering Workers With AI

        </h2>

        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">

          KaamCall AI helps labourers connect with
          trusted contractors using voice AI,
          smart job matching, attendance tracking,
          and wage management.

        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">

          <Link
            to="/register"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition duration-300 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/20"
          >
            Get Started
          </Link>

          <Link
            to="/jobs"
            className="border border-cyan-400 hover:bg-cyan-400 hover:text-black transition duration-300 px-8 py-4 rounded-2xl font-bold"
          >
            Explore Jobs
          </Link>

        </div>

      </div>

    </section>
  );
}