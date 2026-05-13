export default function Stats() {
  return (
    <section className="relative z-10 px-6 pb-20">

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 text-center hover:scale-105 transition duration-300">

          <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-2">
            10K+
          </h2>

          <p className="text-gray-300">
            Workers Connected
          </p>

        </div>

        <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 text-center hover:scale-105 transition duration-300">

          <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-2">
            2K+
          </h2>

          <p className="text-gray-300">
            Active Contractors
          </p>

        </div>

        <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 text-center hover:scale-105 transition duration-300">

          <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-2">
            ₹50L+
          </h2>

          <p className="text-gray-300">
            Wages Managed
          </p>

        </div>

        <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 text-center hover:scale-105 transition duration-300">

          <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-2">
            AI Powered
          </h2>

          <p className="text-gray-300">
            Smart Hiring System
          </p>

        </div>

      </div>

    </section>
  );
}