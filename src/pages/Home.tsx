import { useState, useEffect, useCallback } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Sun, Moon } from "lucide-react";
import {
  Heart,
  CalendarDays,
  Gift,
  MessageSquare,
  MapPin,
  ArrowRight,
  PartyPopper,
  Clock3,
  Users,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import HeroBillboard from "../components/HeroBillboard";
import NetflixRow from "../components/NetflixRow";
import PartySpotlightCard from "../components/PartySpotlightCard";
import TimelessBackdrop from "../components/TimelessBackdrop";
import type { PartyMember } from "../components/PartySpotlightCard";
import { weddingDetails } from "../data/weddingDetails";

const partyMembers: PartyMember[] = [
  {
    name: "Mae D",
    role: "Maid of Honor",
    tagline: "Maid of Honor",
  },
  {
    name: "Jenny",
    role: "Bridesmaid",
    tagline: "Bridesmaid",
  },
  {
    name: "Maria P",
    role: "Bridesmaid",
    tagline: "Bridesmaid",
  },
  {
    name: "Irish D",
    role: "Bridesmaid",
    tagline: "Bridesmaid",
  },
  {
    name: "Alyssa",
    role: "Bridesmaid",
    tagline: "Bridesmaid",
  },
  {
    name: "Angelique S",
    role: "Bridesmaid",
    tagline: "Bridesmaid",
  },
  {
    name: "Katie S",
    role: "Bridesmaid",
    tagline: "Bridesmaid",
  },
  {
    name: "Melinda",
    role: "Bridesmaid",
    tagline: "Bridesmaid",
  },
  {
    name: "Ryan N",
    role: "Best Man",
    tagline: "Best Man",
  },
  { name: "Manjo P", role: "Groomsman", tagline: "Groomsman" },
  { name: "Gami P", role: "Groomsman", tagline: "Groomsman" },
  { name: "Jared P", role: "Groomsman", tagline: "Groomsman" },
  { name: "Cameron S", role: "Groomsman", tagline: "Groomsman" },
  { name: "Gideon", role: "Groomsman", tagline: "Groomsman" },
  { name: "Vincent D", role: "Groomsman", tagline: "Groomsman" },
  { name: "Mark D", role: "Groomsman", tagline: "Groomsman" },
  { name: "Brian D", role: "Groomsman", tagline: "Groomsman" },
  { name: "Mlyard A", role: "Groomsman", tagline: "Groomsman" },
  { name: "Danny C", role: "Groomsman", tagline: "Groomsman" },
];

const homeLinks = [
  {
    title: "Our Story",
    description: "How we met, fell in love, and arrived at forever.",
    path: "/our-story",
    icon: Heart,
    kicker: "Journey",
  },
  {
    title: "Wedding Day",
    description: "See the full timeline and where each moment happens.",
    path: "/wedding-day",
    icon: CalendarDays,
    kicker: "Timeline",
  },
  {
    title: "Venues",
    description: "Directions, logistics, and all the location details.",
    path: "/venues",
    icon: MapPin,
    kicker: "Locations",
  },
  {
    title: "Registry",
    description: "Simple cash registry with secure payment options.",
    path: "/registry",
    icon: Gift,
    kicker: "Gifts",
  },
  {
    title: "RSVP",
    description: "Let us know if you can make it and your transport preference.",
    path: "/rsvp",
    icon: PartyPopper,
    kicker: "Respond",
  },
  {
    title: "Contact",
    description: "Questions, travel notes, or anything else we can help with.",
    path: "/contact",
    icon: MessageSquare,
    kicker: "Support",
  },
];

const highlightStats = [
  { label: "The Date", value: "Aug 29", icon: CalendarDays },
  { label: "Venues", value: "2", icon: MapPin },
  { label: "Wedding Party", value: "19", icon: Users },
  { label: "Days to Go", value: "78", icon: Clock3 },
];

export default function Home() {
  const { isDark, setIsDark } = useOutletContext<{
    isDark: boolean;
    setIsDark: (v: boolean) => void;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [entered, setEntered] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem("home-entered") === "1";
  });
  const goToOurStory = useCallback(() => navigate("/our-story"), [navigate]);
  const goToWeddingDay = useCallback(
    () => navigate("/wedding-day"),
    [navigate],
  );
  const goToPath = useCallback((path: string) => navigate(path), [navigate]);
  const switchToLight = useCallback(() => setIsDark(false), [setIsDark]);
  const switchToDark = useCallback(() => setIsDark(true), [setIsDark]);

  useEffect(() => {
    const state = location.state as { skipSplash?: boolean } | null;
    if (state?.skipSplash) {
      setEntered(true);
      window.sessionStorage.setItem("home-entered", "1");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Listen for "reset-splash" from the navbar logo click
  const resetSplash = useCallback(() => {
    setEntered(false);
    window.sessionStorage.removeItem("home-entered");
  }, []);
  useEffect(() => {
    window.addEventListener("reset-splash", resetSplash);
    return () => window.removeEventListener("reset-splash", resetSplash);
  }, [resetSplash]);

  // Animated split divider — pans between 30% and 70% of the viewport
  const splitX = useMotionValue(50);

  useEffect(() => {
    const controls = animate(splitX, [30, 70, 30], {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    });
    return controls.stop;
  }, [splitX]);

  const clipLeft = useTransform(splitX, (v) => `inset(0 ${100 - v}% 0 0)`);
  const clipRight = useTransform(splitX, (v) => `inset(0 0 0 ${v}%)`);
  const dividerLeft = useTransform(splitX, (v) => `${v}%`);

  return (
    <>
      {/* Split-personality splash screen */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            {/* === Light theme side === */}
            <motion.div
              className="absolute inset-0"
              style={{ clipPath: clipLeft }}
            >
              <TimelessBackdrop variant="splash" />
            </motion.div>

            {/* === Dark / Tron theme side === */}
            <motion.div
              className="absolute inset-0 bg-tron-dark"
              style={{ clipPath: clipRight }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(102,252,241,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(102,252,241,0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "50px 50px",
                }}
              />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-tron-blue/8 rounded-full blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-tron-accent/10 rounded-full blur-[80px]" />
            </motion.div>

            {/* === Animated divider line === */}
            <motion.div
              className="absolute top-0 bottom-0 w-px z-10"
              style={{ left: dividerLeft }}
            >
              <div className="w-px h-full bg-gradient-to-b from-transparent via-sage to-transparent dark:via-tron-blue" />
              <div className="absolute top-0 bottom-0 -left-[2px] w-[5px] bg-gradient-to-b from-transparent via-sage/30 to-transparent dark:via-tron-blue/30 blur-sm" />
            </motion.div>

            {/* === Center content (above both halves) === */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center px-8"
              >
                {/* Name with split coloring */}
                <h1 className="text-5xl sm:text-7xl font-bold mb-2 relative">
                  <span className="font-serif text-dusty-blue dark:text-[#d6d1c8]">
                    Angel &amp; Seun
                  </span>
                </h1>

                <p className="text-lg mb-10 text-warm-gray/80">
                  are getting married
                </p>

                {/* Enter Experience */}
                <button
                  onClick={() => {
                    setEntered(true);
                    window.sessionStorage.setItem("home-entered", "1");
                  }}
                  className="px-8 py-4 rounded-lg font-semibold text-lg transition-all cursor-pointer
                    bg-[linear-gradient(135deg,rgba(184,143,74,0.96),rgba(127,154,184,0.96))] text-cream
                    hover:shadow-[0_18px_42px_rgba(127,154,184,0.24)] shadow-[0_14px_34px_rgba(184,143,74,0.22)]"
                >
                  Enter Experience
                </button>

                {/* Choose Your Theme */}
                <div className="mt-6">
                  <p className="text-sm text-warm-gray/60 mb-3">
                    Choose your theme
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={switchToLight}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer border ${
                        !isDark
                          ? "bg-gilded-gold/15 border-gilded-gold/40 text-dusty-blue shadow-[0_12px_24px_rgba(184,143,74,0.16)] scale-105"
                          : "bg-white/10 border-sage/20 text-warm-gray/70 hover:border-sage/40"
                      }`}
                    >
                      <Sun size={16} />
                      Timeless
                    </button>
                    <button
                      onClick={switchToDark}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer border ${
                        isDark
                          ? "bg-tron-blue/10 border-tron-blue text-tron-blue shadow-[0_0_15px_rgba(102,252,241,0.3)] scale-105"
                          : "bg-tron-grid/20 border-tron-blue/20 text-gray-400 hover:border-tron-blue/40"
                      }`}
                    >
                      <Moon size={16} />
                      Tron
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PageTransition>
        <HeroBillboard
          title="Angel & Seun"
          titleNode={
            <span className="font-serif">Angel &amp; Seun</span>
          }
          subtitle="Join us for the celebration of a lifetime. Two souls, one unforgettable evening."
          date={weddingDetails.dateDisplay}
          onPlay={goToOurStory}
          onMoreInfo={goToWeddingDay}
          lightBgImage={weddingDetails.images.aerialView}
          darkBgImage={weddingDetails.images.churchExterior}
        />

        {/* ── 1. Wedding Party carousel — full width ── */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-8 pb-2"
        >
          <NetflixRow title="Wedding Party">
            {partyMembers.map((member) => (
              <PartySpotlightCard key={member.name} member={member} isDark={isDark} />
            ))}
          </NetflixRow>
        </motion.section>

        {/* ── 2. Stats strip — edge to edge ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className={`mt-10 border-y py-8 ${isDark ? "border-tron-blue/15 bg-tron-grid/40" : "border-sage/20 bg-white/60"}`}
        >
          <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-6 px-6 sm:grid-cols-4 sm:px-10">
            {highlightStats.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="text-center"
                >
                  <div className={`mx-auto inline-flex h-9 w-9 items-center justify-center rounded-xl ${isDark ? "bg-tron-blue/15 text-tron-blue" : "bg-sage/20 text-dusty-blue"}`}>
                    <Icon size={17} />
                  </div>
                  <p className={`mt-3 text-3xl font-bold ${isDark ? "font-tech text-tron-blue" : "font-serif text-dusty-blue"}`}>
                    {item.value}
                  </p>
                  <p className={`mt-1 text-[0.62rem] uppercase tracking-[0.3em] ${isDark ? "text-tron-accent" : "text-sage"}`}>
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── 3. Editorial split — text + venue photo collage ── */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 grid min-h-[480px] gap-0 lg:grid-cols-2"
        >
          <div className={`flex flex-col justify-center px-6 py-12 sm:px-10 lg:py-16 ${isDark ? "bg-tron-grid/60" : "bg-white/82"}`}>
            <p className={`text-xs uppercase tracking-[0.36em] ${isDark ? "font-tech text-tron-accent" : "text-sage"}`}>
              August 29, 2026
            </p>
            <h2 className={`mt-4 text-4xl leading-tight sm:text-5xl ${isDark ? "font-tech text-tron-blue" : "font-serif text-dusty-blue"}`}>
              Two venues.<br />One celebration.
            </h2>
            <p className={`mt-5 max-w-md text-sm leading-relaxed sm:text-base ${isDark ? "text-gray-400" : "text-warm-gray"}`}>
              The ceremony begins at noon at{" "}
              <span className={isDark ? "text-tron-blue" : "text-dusty-blue"}>Immaculate Conception Church</span>{" "}
              in Washington, DC, followed by an afternoon cocktail hour and
              evening reception at{" "}
              <span className={isDark ? "text-tron-blue" : "text-dusty-blue"}>Beacon Hill Manor</span>{" "}
              in Paeonian Springs, Virginia.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={goToWeddingDay}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.26em] transition cursor-pointer ${isDark ? "bg-tron-blue text-tron-black hover:bg-tron-accent" : "bg-dusty-blue text-white hover:bg-dusty-blue/90"}`}
              >
                Full Timeline <ArrowRight size={14} />
              </button>
              <button
                onClick={() => goToPath("/venues")}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.26em] border transition cursor-pointer ${isDark ? "border-tron-blue/40 text-tron-blue hover:bg-tron-blue/10" : "border-dusty-blue/35 text-dusty-blue hover:bg-dusty-blue/8"}`}
              >
                Venues &amp; Directions
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-1">
            {[
              weddingDetails.images.aerialView,
              weddingDetails.images.gallery[1],
              weddingDetails.images.gallery[2],
              weddingDetails.images.manorExterior,
            ].map((src, idx) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="overflow-hidden"
              >
                <img
                  src={src}
                  alt="Beacon Hill Manor"
                  className={`h-full min-h-[180px] w-full object-cover transition-transform duration-700 hover:scale-105 ${isDark ? "brightness-[0.55] saturate-[0.6]" : "brightness-95"}`}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 4. Site nav cards — full width padded grid ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-10 px-5 sm:px-8 lg:px-10"
        >
          <div className="mb-6 flex items-baseline justify-between">
            <p className={`text-xs uppercase tracking-[0.34em] ${isDark ? "font-tech text-tron-accent" : "text-sage"}`}>
              Explore
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homeLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.button
                  key={link.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => goToPath(link.path)}
                  className={`group rounded-2xl border p-5 text-left transition-all duration-200 cursor-pointer ${isDark ? "border-tron-blue/15 bg-tron-grid/50 hover:border-tron-blue/40 hover:-translate-y-0.5" : "border-sage/20 bg-white/80 hover:border-dusty-blue/35 hover:shadow-md hover:-translate-y-0.5"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? "bg-tron-blue/15 text-tron-blue" : "bg-sage/20 text-dusty-blue"}`}>
                      <Icon size={18} />
                    </div>
                    <span className={`text-[0.6rem] uppercase tracking-[0.3em] ${isDark ? "text-tron-accent" : "text-sage"}`}>{link.kicker}</span>
                  </div>
                  <h3 className={`mt-4 text-xl ${isDark ? "font-tech text-tron-blue" : "font-serif text-dusty-blue"}`}>{link.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-warm-gray"}`}>{link.description}</p>
                  <span className={`mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.24em] ${isDark ? "text-tron-blue" : "text-dusty-blue"}`}>
                    Open <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* ── 5. Venue photo grid — full width ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <div className="flex items-baseline justify-between px-5 pb-5 sm:px-8 lg:px-10">
            <div>
              <p className={`text-xs uppercase tracking-[0.34em] ${isDark ? "font-tech text-tron-accent" : "text-sage"}`}>The Venue</p>
              <h3 className={`mt-2 text-2xl sm:text-3xl ${isDark ? "font-tech text-tron-blue" : "font-serif text-dusty-blue"}`}>
                Beacon Hill Manor
              </h3>
            </div>
            <button
              onClick={() => goToPath("/venues")}
              className={`text-xs uppercase tracking-[0.24em] ${isDark ? "text-tron-blue" : "text-dusty-blue"}`}
            >
              See Details →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {weddingDetails.images.gallery.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className={`overflow-hidden ${
                  i === 0 ? "col-span-2 sm:col-span-1 sm:row-span-2" : ""
                }`}
              >
                <img
                  src={src}
                  alt="Beacon Hill Manor"
                  className={`h-full min-h-[180px] w-full object-cover transition-transform duration-700 hover:scale-105 ${
                    isDark ? "brightness-[0.55] saturate-[0.6]" : "brightness-95"
                  }`}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <footer
          className={`py-12 text-center border-t ${
            isDark
              ? "border-tron-blue/10 text-gray-500"
              : "border-sage/20 text-warm-gray"
          }`}
        >
          <p className={`text-sm ${isDark ? "font-tech" : "font-serif"}`}>
            Made with love - <span className="text-lg font-serif">Angel &amp; Seun</span>, 2026
          </p>
        </footer>
      </PageTransition>
    </>
  );
}
