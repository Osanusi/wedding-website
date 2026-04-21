import { useState, useEffect, useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Sun, Moon } from "lucide-react";
import {
  Coffee,
  Star,
  Plane,
  Home as HomeIcon,
  Gem,
  Wine,
  Church,
  PartyPopper,
  Music,
  UtensilsCrossed,
  ChefHat,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import HeroBillboard from "../components/HeroBillboard";
import NetflixRow from "../components/NetflixRow";
import NetflixCard from "../components/NetflixCard";
import PartySpotlightCard from "../components/PartySpotlightCard";
import type { PartyMember } from "../components/PartySpotlightCard";

const storyCards = [
  {
    title: "How We Met",
    subtitle: "A chance encounter at a coffee shop",
    icon: Coffee,
    iconVariant: "sage",
  },
  {
    title: "First Date",
    subtitle: "Dinner under the stars",
    icon: Star,
    iconVariant: "blue",
  },
  {
    title: "The Trip",
    subtitle: "Two weeks in Italy changed everything",
    icon: Plane,
    iconVariant: "cream",
  },
  {
    title: "Moving In",
    subtitle: "Our first home together",
    icon: HomeIcon,
    iconVariant: "blush",
  },
  {
    title: "The Proposal",
    subtitle: "On a cliffside at sunset",
    icon: Gem,
    iconVariant: "blue",
  },
  {
    title: "Engagement Party",
    subtitle: "Celebrating with loved ones",
    icon: Wine,
    iconVariant: "sage",
  },
];

const partyMembers: PartyMember[] = [
  { name: "Sarah M.", role: "Maid of Honor", tagline: "BFF since day one", themeSong: "/audio/party/sarah.mp3" },
  { name: "Emily R.", role: "Bridesmaid", tagline: "Always the life of the party" },
  { name: "Jessica L.", role: "Bridesmaid", tagline: "The one who cries at everything" },
  { name: "Mike T.", role: "Best Man", tagline: "Keeper of the ring", themeSong: "/audio/party/mike.mp3" },
  { name: "David K.", role: "Groomsman", tagline: "Dance floor legend" },
  { name: "Chris W.", role: "Groomsman", tagline: "Always with a joke ready" },
  { name: "Rachel B.", role: "Bridesmaid", tagline: "The planner of all plans" },
  { name: "James H.", role: "Groomsman", tagline: "Calm, cool, collected" },
];

const eventCards = [
  {
    title: "Ceremony",
    subtitle: "4:00 PM — Garden Pavilion",
    icon: Church,
    iconVariant: "sage",
  },
  {
    title: "Cocktail Hour",
    subtitle: "5:00 PM — Terrace Lounge",
    icon: Wine,
    iconVariant: "blue",
  },
  {
    title: "Reception",
    subtitle: "6:30 PM — Grand Ballroom",
    icon: PartyPopper,
    iconVariant: "cream",
  },
  {
    title: "First Dance",
    subtitle: "7:00 PM — A moment to remember",
    icon: Music,
    iconVariant: "blush",
  },
  {
    title: "Dinner",
    subtitle: "7:30 PM — Three-course meal",
    icon: UtensilsCrossed,
    iconVariant: "sage",
  },
  {
    title: "Dancing & Party",
    subtitle: "9:00 PM — Until midnight",
    icon: Music,
    iconVariant: "blue",
  },
];

const registryCards = [
  {
    title: "Kitchen & Dining",
    subtitle: "Help us build our dream kitchen",
    icon: ChefHat,
    iconVariant: "sage",
  },
  {
    title: "Home Decor",
    subtitle: "Feathering our new nest",
    icon: HomeIcon,
    iconVariant: "cream",
  },
  {
    title: "Honeymoon Fund",
    subtitle: "Adventures await in Bali",
    icon: Plane,
    iconVariant: "blue",
  },
  {
    title: "Experiences",
    subtitle: "Date night & adventure gifts",
    icon: Sparkles,
    iconVariant: "blush",
  },
  {
    title: "Charity",
    subtitle: "Give back in our name",
    icon: HeartHandshake,
    iconVariant: "sage",
  },
];

export default function Home() {
  const { isDark, setIsDark } = useOutletContext<{
    isDark: boolean;
    setIsDark: (v: boolean) => void;
  }>();
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);

  // Listen for "reset-splash" from the navbar logo click
  const resetSplash = useCallback(() => setEntered(false), []);
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
              className="absolute inset-0 bg-gradient-to-br from-beige via-cream to-beige"
              style={{ clipPath: clipLeft }}
            >
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_30%_40%,#9DC183_0%,transparent_50%)]" />
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_60%,#6B8E23_0%,transparent_40%)]" />
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
                  <span className="font-cursive text-6xl sm:text-8xl text-dusty-blue">
                    Angel
                  </span>
                  <span className="text-warm-gray dark:text-gray-500 mx-2 font-serif">
                    &
                  </span>
                  <span className="font-tech text-tron-blue animate-glow-pulse">
                    Seun
                  </span>
                </h1>

                <p className="text-lg mb-10 text-warm-gray/80">
                  are getting married
                </p>

                {/* Enter Experience */}
                <button
                  onClick={() => setEntered(true)}
                  className="px-8 py-4 rounded-lg font-semibold text-lg transition-all cursor-pointer
                    bg-gradient-to-r from-dusty-blue to-tron-blue text-white
                    hover:shadow-[0_0_30px_rgba(102,252,241,0.3)] shadow-lg"
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
                      onClick={() => setIsDark(false)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer border ${
                        !isDark
                          ? "bg-sage/20 border-dusty-blue text-dusty-blue shadow-md scale-105"
                          : "bg-white/10 border-sage/20 text-warm-gray/70 hover:border-sage/40"
                      }`}
                    >
                      <Sun size={16} />
                      Timeless
                    </button>
                    <button
                      onClick={() => setIsDark(true)}
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
            <>
              <span className="font-cursive">Angel</span>
              <span className={isDark ? "" : " font-serif"}> & Seun</span>
            </>
          }
          subtitle="Join us for the celebration of a lifetime. Two souls, one unforgettable evening."
          date="September 15, 2026"
          onPlay={() => navigate("/our-story")}
          onMoreInfo={() => navigate("/wedding-day")}
        />

        <div className="py-8 space-y-4">
          <NetflixRow title="Our Story">
            {storyCards.map((card) => (
              <NetflixCard
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
                icon={card.icon}
                iconVariant={card.iconVariant}
                onClick={() => navigate("/our-story")}
              />
            ))}
          </NetflixRow>

          <NetflixRow title="Wedding Party">
            {partyMembers.map((member) => (
              <PartySpotlightCard
                key={member.name}
                member={member}
                isDark={isDark}
              />
            ))}
          </NetflixRow>

          <NetflixRow title="The Big Day">
            {eventCards.map((card) => (
              <NetflixCard
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
                icon={card.icon}
                iconVariant={card.iconVariant}
                onClick={() => navigate("/wedding-day")}
              />
            ))}
          </NetflixRow>

          <NetflixRow title="Registry">
            {registryCards.map((card) => (
              <NetflixCard
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
                icon={card.icon}
                iconVariant={card.iconVariant}
                onClick={() => navigate("/registry")}
              />
            ))}
          </NetflixRow>
        </div>

        {/* Footer */}
        <footer
          className={`py-12 text-center border-t ${
            isDark
              ? "border-tron-blue/10 text-gray-500"
              : "border-sage/20 text-warm-gray"
          }`}
        >
          <p className={`text-sm ${isDark ? "font-tech" : "font-serif"}`}>
            Made with love — <span className="font-cursive text-lg">Angel</span> & Seun, 2026
          </p>
        </footer>
      </PageTransition>
    </>
  );
}
