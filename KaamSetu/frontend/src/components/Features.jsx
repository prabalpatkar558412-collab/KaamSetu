import {
  Briefcase,
  Bot,
  Mic,
  Wallet,
} from "lucide-react";

export default function Features() {

  const features = [
    {
      title: "AI Job Matching",
      description:
        "Smart AI-based worker and contractor matching.",
      icon: <Briefcase size={32} />,
    },
    {
      title: "Voice Recognition",
      description:
        "Voice-first platform for low-literacy workers.",
      icon: <Mic size={32} />,
    },
    {
      title: "AI Assistant",
      description:
        "Instant chatbot support for jobs and wages.",
      icon: <Bot size={32} />,
    },
    {
      title: "Wage Tracking",
      description:
        "Track salaries, attendance, and payments easily.",
      icon: <Wallet size={32} />,
    },
  ];

  return (
    <section className="relative z-10 px-6 pb-28">

      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">

        Platform Features

      </h2>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {features.map((feature, index) => (

          <div
            key={index}
            className="group bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:-translate-y-2 transition duration-500 shadow-xl hover:shadow-cyan-500/20"
          >

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">

              {feature.icon}

            </div>

            <h3 className="text-2xl font-bold mb-4">

              {feature.title}

            </h3>

            <p className="text-gray-300 leading-relaxed">

              {feature.description}

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}