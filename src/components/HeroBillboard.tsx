import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import type { ReactNode } from "react";
import TimelessBackdrop from "./TimelessBackdrop";

interface HeroBillboardProps {
  title: string;
  titleNode?: ReactNode;
  subtitle: string;
  date: string;
  onPlay?: () => void;
  onMoreInfo?: () => void;
}

export default function HeroBillboard({
  title,
  titleNode,
  subtitle,
  date,
  onPlay,
  onMoreInfo,
}: HeroBillboardProps) {
  const { isDark } = useOutletContext<{ isDark: boolean }>();

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {isDark ? (
          // Tron grid background
          <div className="w-full h-full bg-tron-dark">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(102,252,241,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(102,252,241,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />
            {/* Glow orb */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tron-blue/10 rounded-full blur-3xl" />
          </div>
        ) : (
          // Timeless royal background
          <div className="w-full h-full">
            <TimelessBackdrop variant="hero" />
          </div>
        )}
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-beige via-beige/30 to-transparent dark:from-tron-black dark:via-tron-black/40 dark:to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 pb-16 sm:pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className={`text-sm sm:text-base tracking-[0.3em] uppercase mb-4 ${
              isDark
                ? "text-tron-accent font-tech"
                : "text-gilded-gold font-serif"
            }`}
          >
            {date}
          </p>

          <h1
            className={`text-5xl sm:text-7xl lg:text-8xl font-bold leading-tight mb-4 ${
              isDark
                ? "font-tech text-tron-blue animate-glow-pulse"
                : "font-serif text-dusty-blue"
            }`}
          >
            {titleNode ?? title}
          </h1>

          <p
            className={`text-lg sm:text-xl max-w-lg mb-8 ${
              isDark ? "text-gray-400" : "text-warm-gray"
            }`}
          >
            {subtitle}
          </p>

          <div className="flex gap-4">
            <button
              onClick={onPlay}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm transition-all cursor-pointer ${
                isDark
                  ? "bg-tron-blue text-tron-black hover:bg-tron-blue/80 shadow-[0_0_20px_rgba(102,252,241,0.3)]"
                  : "bg-[linear-gradient(135deg,rgba(184,143,74,0.96),rgba(127,154,184,0.96))] text-cream hover:shadow-[0_18px_40px_rgba(127,154,184,0.22)] shadow-[0_12px_30px_rgba(184,143,74,0.2)]"
              }`}
            >
              <Play size={18} />
              Watch Our Story
            </button>

            <button
              onClick={onMoreInfo}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm transition-all cursor-pointer ${
                isDark
                  ? "bg-tron-grid/80 text-gray-200 hover:bg-tron-grid border border-tron-blue/20"
                  : "bg-white/75 text-dusty-blue hover:bg-white border border-gilded-gold/30 shadow-[0_10px_24px_rgba(184,143,74,0.08)]"
              }`}
            >
              <Info size={18} />
              More Info
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
