import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";

const milestones = [
  {
    year: "2021",
    title: "How We Met",
    description:
      "A rainy Tuesday afternoon at Lighthouse Coffee. Angel ordered a cortado; Seun reached for the same cup. The rest, as they say, is history.",
    side: "left" as const,
  },
  {
    year: "2021",
    title: "First Date",
    description:
      "A candlelit dinner at that tiny Italian place downtown. We talked until the staff started stacking chairs.",
    side: "right" as const,
  },
  {
    year: "2022",
    title: "The Italy Trip",
    description:
      "Two weeks wandering through Florence, Rome, and the Amalfi Coast. Somewhere between the Colosseum and a plate of cacio e pepe, we fell completely.",
    side: "left" as const,
  },
  {
    year: "2023",
    title: "Moving In Together",
    description:
      "Our first apartment — a cozy one-bedroom with a leaky faucet and the best morning light. We painted the walls sage green.",
    side: "right" as const,
  },
  {
    year: "2024",
    title: "Getting a Dog",
    description:
      "Luna joined our family — a golden retriever with an attitude problem and a heart of gold. She chose us at the shelter.",
    side: "left" as const,
  },
  {
    year: "2025",
    title: "The Proposal",
    description:
      'On the cliffs of Big Sur at sunset, with the Pacific crashing below. One knee, one ring, one "yes" that echoed louder than the waves.',
    side: "right" as const,
  },
  {
    year: "2026",
    title: "The Wedding",
    description:
      "And here we are. Ready to promise forever in front of everyone we love. We can't wait to celebrate with you.",
    side: "left" as const,
  },
];

export default function OurStory() {
  const { isDark } = useOutletContext<{ isDark: boolean }>();

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-16 pb-8 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-4xl sm:text-6xl font-bold mb-4 ${
            isDark
              ? "font-tech text-tron-blue animate-glow-pulse"
              : "font-serif text-dusty-blue"
          }`}
        >
          Our Story
        </motion.h1>
        <p
          className={`text-lg max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-warm-gray"}`}
        >
          Every love story is beautiful, but ours is our favorite.
        </p>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-4 pb-20 relative">
        {/* Center Line */}
        <div
          className={`absolute left-1/2 top-0 bottom-0 w-px hidden sm:block ${
            isDark ? "bg-tron-blue/30" : "bg-sage/40"
          }`}
        />

        <div className="space-y-12 sm:space-y-16">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, x: milestone.side === "left" ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col sm:flex-row items-center gap-6 ${
                milestone.side === "right" ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* Content Card */}
              <div
                className={`w-full sm:w-5/12 p-6 rounded-xl ${
                  isDark
                    ? "bg-tron-grid border border-tron-blue/10 hover:border-tron-blue/30"
                    : "bg-white/80 border border-sage/20 shadow-md"
                } transition-all duration-300`}
              >
                <span
                  className={`text-xs uppercase tracking-widest ${
                    isDark
                      ? "text-tron-accent font-tech"
                      : "text-sage font-sans"
                  }`}
                >
                  {milestone.year}
                </span>
                <h3
                  className={`text-xl font-semibold mt-2 mb-3 ${
                    isDark
                      ? "text-tron-blue font-tech"
                      : "text-dusty-blue font-serif"
                  }`}
                >
                  {milestone.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-warm-gray"}`}
                >
                  {milestone.description}
                </p>
              </div>

              {/* Timeline Node */}
              <div className="hidden sm:flex w-2/12 justify-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    isDark
                      ? "bg-tron-blue border-tron-blue shadow-[0_0_10px_rgba(102,252,241,0.5)]"
                      : "bg-sage border-dusty-blue"
                  }`}
                />
              </div>

              {/* Spacer for alignment */}
              <div className="hidden sm:block w-5/12" />
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
