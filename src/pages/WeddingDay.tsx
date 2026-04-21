import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, MapPin, Shirt } from "lucide-react";
import PageTransition from "../components/PageTransition";

const WEDDING_DATE = new Date("2026-09-15T16:00:00");

const schedule = [
  {
    time: "3:30 PM",
    event: "Guest Arrival",
    detail: "Welcome cocktails on the terrace",
  },
  {
    time: "4:00 PM",
    event: "Ceremony",
    detail: "Garden Pavilion — an outdoor celebration of love",
  },
  {
    time: "5:00 PM",
    event: "Cocktail Hour",
    detail: "Terrace Lounge — craft cocktails & live jazz trio",
  },
  {
    time: "6:30 PM",
    event: "Reception",
    detail: "Grand Ballroom — dinner, toasts & laughter",
  },
  {
    time: "7:00 PM",
    event: "First Dance",
    detail: "A moment just for the two of us (and 200 witnesses)",
  },
  {
    time: "7:30 PM",
    event: "Dinner",
    detail: "Three-course farm-to-table menu with wine pairings",
  },
  {
    time: "9:00 PM",
    event: "Dancing & Party",
    detail: "DJ takes the stage — dance until midnight!",
  },
  {
    time: "11:30 PM",
    event: "Sparkler Send-Off",
    detail: "Light the way as we start our forever",
  },
];

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function WeddingDay() {
  const { isDark } = useOutletContext<{ isDark: boolean }>();
  const countdown = useCountdown(WEDDING_DATE);

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-16 pb-8 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl sm:text-6xl font-bold mb-4 ${
            isDark
              ? "font-tech text-tron-blue animate-glow-pulse"
              : "font-serif text-dusty-blue"
          }`}
        >
          The Big Day
        </motion.h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-warm-gray"}`}>
          September 15, 2026 — The Grandview Estate
        </p>
      </section>

      {/* Countdown */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div
          className={`grid grid-cols-4 gap-4 p-6 rounded-2xl text-center ${
            isDark
              ? "bg-tron-grid border border-tron-blue/20"
              : "bg-white/80 border border-sage/20 shadow-lg"
          }`}
        >
          {Object.entries(countdown).map(([label, value]) => (
            <div key={label}>
              <div
                className={`text-3xl sm:text-5xl font-bold tabular-nums ${
                  isDark
                    ? "font-tech text-tron-blue"
                    : "font-serif text-dusty-blue"
                }`}
              >
                {String(value).padStart(2, "0")}
              </div>
              <div
                className={`text-xs uppercase tracking-widest mt-2 ${
                  isDark ? "text-tron-accent" : "text-warm-gray"
                }`}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <h2
          className={`text-2xl font-semibold mb-6 flex items-center gap-2 ${
            isDark ? "font-tech text-tron-blue" : "font-serif text-dusty-blue"
          }`}
        >
          <Clock size={22} /> Schedule
        </h2>

        <div className="space-y-4">
          {schedule.map((item, index) => (
            <motion.div
              key={item.event}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`flex gap-4 p-4 rounded-xl transition-all ${
                isDark
                  ? "bg-tron-grid/50 hover:bg-tron-grid border border-tron-blue/5 hover:border-tron-blue/20"
                  : "bg-white/60 hover:bg-white border border-sage/10 hover:shadow-md"
              }`}
            >
              <div
                className={`w-20 flex-shrink-0 text-sm font-semibold pt-1 ${
                  isDark ? "text-tron-accent font-tech" : "text-sage"
                }`}
              >
                {item.time}
              </div>
              <div>
                <h3
                  className={`font-semibold ${
                    isDark ? "text-gray-200" : "text-dusty-blue"
                  }`}
                >
                  {item.event}
                </h3>
                <p
                  className={`text-sm mt-1 ${isDark ? "text-gray-500" : "text-warm-gray"}`}
                >
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Venue & Dress Code */}
      <section className="max-w-3xl mx-auto px-4 pb-20 grid sm:grid-cols-2 gap-6">
        <div
          className={`p-6 rounded-xl ${
            isDark
              ? "bg-tron-grid border border-tron-blue/10"
              : "bg-white/80 border border-sage/20 shadow-md"
          }`}
        >
          <h3
            className={`font-semibold mb-3 flex items-center gap-2 ${
              isDark ? "text-tron-blue font-tech" : "text-dusty-blue font-serif"
            }`}
          >
            <MapPin size={18} /> Venue
          </h3>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-warm-gray"}`}
          >
            The Grandview Estate
            <br />
            1234 Hilltop Drive
            <br />
            Napa Valley, CA 94558
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block mt-3 text-sm font-medium ${
              isDark
                ? "text-tron-blue hover:text-tron-blue/80"
                : "text-dusty-blue hover:text-dusty-blue/80"
            }`}
          >
            Get Directions →
          </a>
        </div>

        <div
          className={`p-6 rounded-xl ${
            isDark
              ? "bg-tron-grid border border-tron-blue/10"
              : "bg-white/80 border border-sage/20 shadow-md"
          }`}
        >
          <h3
            className={`font-semibold mb-3 flex items-center gap-2 ${
              isDark ? "text-tron-blue font-tech" : "text-dusty-blue font-serif"
            }`}
          >
            <Shirt size={18} /> Dress Code
          </h3>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-warm-gray"}`}
          >
            <strong>Cocktail Attire</strong>
            <br />
            <br />
            Ladies: Cocktail dresses, jumpsuits, or dressy separates.
            <br />
            Gentlemen: Suits or sport coats with dress pants.
            <br />
            <br />
            Garden ceremony is on grass — plan footwear accordingly!
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
