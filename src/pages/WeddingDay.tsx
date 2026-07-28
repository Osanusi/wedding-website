import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, MapPin, Shirt, Bus } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { weddingDetails } from "../data/weddingDetails";

const WEDDING_DATE = new Date(weddingDetails.startDateTime);

const schedule = [
  {
    time: "11:30 AM",
    event: "Guest Arrival",
    detail: "Arrive at Immaculate Conception Church and get settled",
  },
  {
    time: "12:00 PM",
    event: "Ceremony",
    detail: "Immaculate Conception Church — vows with family and friends",
  },
  {
    time: "1:30 PM",
    event: "Shuttle to Reception",
    detail:
      "Shuttle departs Immaculate Conception Church for Beacon Hill Manor between 1:30 – 2:00 PM. Park in the garage near the church if you plan to ride.",
  },
  {
    event: "Reception",
    time: "3:30 PM",
    detail: "Beacon Hill Manor — reception begins with cocktails and welcome toasts",
  },
  {
    time: "6:30 PM",
    event: "First Dance",
    detail: "A moment just for the two of us (and 200 witnesses)",
  },
  {
    time: "7:00 PM",
    event: "Dinner",
    detail: "Buffet-style dinner service",
  },
  {
    time: "8:00 PM",
    event: "Dancing & Party",
    detail: "DJ takes the stage — dance until midnight!",
  },
  {
    time: "10:00 PM",
    event: "Shuttle Back",
    detail:
      "Shuttle departs Beacon Hill Manor around 10:00 PM to return guests to Immaculate Conception Church.",
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
          {weddingDetails.dateDisplay} — {weddingDetails.venue.name}
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

      {/* Transportation */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <h2
          className={`text-2xl font-semibold mb-6 flex items-center gap-2 ${
            isDark ? "font-tech text-tron-blue" : "font-serif text-dusty-blue"
          }`}
        >
          <Bus size={22} /> Transportation
        </h2>

        <div
          className={`p-6 rounded-2xl ${
            isDark
              ? "bg-tron-grid border border-tron-blue/10"
              : "bg-white/80 border border-sage/20 shadow-md"
          }`}
        >
          <p
            className={`text-sm leading-relaxed ${
              isDark ? "text-gray-400" : "text-warm-gray"
            }`}
          >
            A shuttle will be provided between{" "}
            <strong>Immaculate Conception Church</strong> and{" "}
            <strong>Beacon Hill Manor</strong> for guests who need
            transportation.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            <div
              className={`rounded-xl p-4 ${
                isDark
                  ? "bg-tron-grid/60 border border-tron-blue/10"
                  : "bg-cream/50 border border-sage/15"
              }`}
            >
              <p
                className={`text-xs uppercase tracking-widest ${
                  isDark ? "text-tron-accent font-tech" : "text-sage"
                }`}
              >
                Church → Reception
              </p>
              <p
                className={`mt-2 font-semibold ${
                  isDark ? "text-gray-200" : "text-dusty-blue"
                }`}
              >
                Departs 1:30 – 2:00 PM
              </p>
              <p
                className={`text-sm mt-1 ${
                  isDark ? "text-gray-500" : "text-warm-gray"
                }`}
              >
                Picks up guests after the ceremony from Immaculate Conception
                Church.
              </p>
            </div>

            <div
              className={`rounded-xl p-4 ${
                isDark
                  ? "bg-tron-grid/60 border border-tron-blue/10"
                  : "bg-cream/50 border border-sage/15"
              }`}
            >
              <p
                className={`text-xs uppercase tracking-widest ${
                  isDark ? "text-tron-accent font-tech" : "text-sage"
                }`}
              >
                Reception → Church
              </p>
              <p
                className={`mt-2 font-semibold ${
                  isDark ? "text-gray-200" : "text-dusty-blue"
                }`}
              >
                Departs ~10:00 PM
              </p>
              <p
                className={`text-sm mt-1 ${
                  isDark ? "text-gray-500" : "text-warm-gray"
                }`}
              >
                Leaves Beacon Hill Manor to return guests to the church around
                10:00 PM.
              </p>
            </div>
          </div>

          <div
            className={`mt-5 rounded-xl p-4 text-sm leading-relaxed ${
              isDark
                ? "bg-tron-blue/5 border border-tron-blue/15 text-gray-400"
                : "bg-sage/10 border border-sage/20 text-warm-gray"
            }`}
          >
            <p>
              <strong
                className={isDark ? "text-tron-blue" : "text-dusty-blue"}
              >
                Parking tip:
              </strong>{" "}
              If you plan to take the shuttle, we recommend parking in the
              garage near Immaculate Conception Church. Emergency &ldquo;wedding
              guest&rdquo; street signs will also be posted in front of the
              church, allowing guests to park on the street during the
              ceremony.
            </p>
          </div>
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
            {weddingDetails.venue.name}
            <br />
            {weddingDetails.venue.addressLine1}
            <br />
            {weddingDetails.venue.addressLine2}
          </p>
          <a
            href={weddingDetails.venue.mapUrl}
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
