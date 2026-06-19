import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";

const milestones = [
  {
    year: "The Beginning",
    title: "A Friendsgiving Plot Twist",
    description:
      "Seun invited Angel and her sister to a close friend's Friendsgiving. Ironically, they started the night lightly trash-talking each other, and Angel left thinking Seun was a little annoying.",
    side: "left" as const,
  },
  {
    year: "Chapter One",
    title: "From Banter to a First Date",
    description:
      "What started as playful back-and-forth became genuine curiosity. They decided to see each other again, and the first real date was set.",
    side: "right" as const,
  },
  {
    year: "Chapter Two",
    title: "Gym Date, Then French Dinner",
    description:
      "Their first date was a gym date, followed by dinner at an amazing French restaurant. The mix of effort, conversation, and laughter made it clear this was going somewhere special.",
    side: "left" as const,
  },
  {
    year: "Chapter Three",
    title: "The Korean BBQ Night",
    description:
      "Soon after, they hosted their own little Korean BBQ night. Somewhere between shared plates and late-night conversation, their bond deepened and felt undeniably real.",
    side: "right" as const,
  },
  {
    year: "Since Then",
    title: "Growing Closer Every Day",
    description:
      "From that point on, everything grew naturally: deeper friendship, stronger love, and the kind of partnership built on faith, laughter, and choosing each other again and again.",
    side: "left" as const,
  },
  {
    year: "Now",
    title: "The Rest Is History",
    description:
      "And now here we are, inviting you into the next chapter. Thank you for being part of our story and for celebrating this day with us.",
    side: "right" as const,
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
          A little unexpected, a lot of laughter, and a love that kept growing.
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
