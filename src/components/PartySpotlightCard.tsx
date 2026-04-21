import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrideSilhouette,
  GroomSilhouette,
  MaidOfHonorSilhouette,
  BestManSilhouette,
} from "./Silhouettes";

export interface PartyMember {
  name: string;
  role: "Maid of Honor" | "Bridesmaid" | "Best Man" | "Groomsman";
  themeSong?: string; // path in public/audio/party/
  tagline?: string; // fun one-liner shown on spotlight
}

interface PartySpotlightCardProps {
  member: PartyMember;
  isDark: boolean;
}

function getSilhouette(role: PartyMember["role"]) {
  switch (role) {
    case "Maid of Honor":
      return MaidOfHonorSilhouette;
    case "Bridesmaid":
      return BrideSilhouette;
    case "Best Man":
      return BestManSilhouette;
    case "Groomsman":
      return GroomSilhouette;
  }
}

export default function PartySpotlightCard({
  member,
  isDark,
}: PartySpotlightCardProps) {
  const [isSpotlit, setIsSpotlit] = useState(false);
  const Silhouette = getSilhouette(member.role);

  const isBridesSide =
    member.role === "Maid of Honor" || member.role === "Bridesmaid";

  const handleEnter = useCallback(() => {
    setIsSpotlit(true);
    // Dispatch custom event so ThemeMusicController can DJ-scratch and play theme song
    window.dispatchEvent(
      new CustomEvent("party-spotlight", {
        detail: { song: member.themeSong || null, name: member.name },
      }),
    );
  }, [member.themeSong, member.name]);

  const handleLeave = useCallback(() => {
    setIsSpotlit(false);
    // Tell music controller to resume normal music
    window.dispatchEvent(new CustomEvent("party-spotlight-end"));
  }, []);

  return (
    <motion.div
      className="flex-shrink-0 snap-start relative cursor-pointer select-none"
      animate={{
        width: isSpotlit ? 320 : 256,
        height: isSpotlit ? 360 : 280,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className={`w-full h-full rounded-2xl overflow-hidden relative transition-all duration-500 ${
          isDark
            ? "bg-tron-dark border border-tron-blue/20"
            : "bg-gradient-to-b from-cream via-beige to-sage/10 border border-sage/30"
        } ${
          isSpotlit
            ? isDark
              ? "shadow-[0_0_60px_rgba(102,252,241,0.35)] border-tron-blue/60"
              : "shadow-[0_0_40px_rgba(157,193,131,0.4)] border-dusty-blue/40"
            : isDark
              ? "shadow-lg"
              : "shadow-md"
        }`}
      >
        {/* ── Spotlight cone effect ── */}
        <AnimatePresence>
          {isSpotlit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 pointer-events-none z-0"
            >
              {isDark ? (
                /* Tron: neon cone from top */
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% -10%, rgba(102,252,241,0.15) 0deg, transparent 60deg, transparent 300deg, rgba(102,252,241,0.15) 360deg)",
                  }}
                />
              ) : (
                /* Timeless: warm golden spot light */
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 20%, rgba(255,253,208,0.8) 0%, rgba(157,193,131,0.15) 50%, transparent 80%)",
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Dark mode: grid + scan ── */}
        {isDark && (
          <>
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(102,252,241,0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(102,252,241,0.06) 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
            />
            {isSpotlit && (
              <div className="absolute inset-0 animate-tron-scan bg-gradient-to-b from-transparent via-tron-blue/8 to-transparent pointer-events-none" />
            )}
          </>
        )}

        {/* ── Light mode: subtle shimmer on spotlight ── */}
        {!isDark && isSpotlit && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </div>
        )}

        {/* ── Silhouette ── */}
        <motion.div
          className="relative z-10 flex justify-center pt-6"
          animate={{ y: isSpotlit ? -4 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Silhouette
            size={isSpotlit ? 90 : 70}
            className={`transition-all duration-500 ${
              isDark
                ? isSpotlit
                  ? "text-tron-blue drop-shadow-[0_0_20px_rgba(102,252,241,0.6)]"
                  : "text-tron-blue/40"
                : isSpotlit
                  ? isBridesSide
                    ? "text-dusty-blue drop-shadow-[0_4px_8px_rgba(107,142,35,0.3)]"
                    : "text-warm-gray drop-shadow-[0_4px_8px_rgba(139,133,137,0.3)]"
                  : isBridesSide
                    ? "text-dusty-blue/30"
                    : "text-warm-gray/30"
            }`}
          />
        </motion.div>

        {/* ── Name + role text ── */}
        <div className="relative z-10 text-center px-4 mt-auto pb-5">
          <motion.h3
            animate={{ scale: isSpotlit ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`font-semibold text-lg leading-tight ${
              isDark ? "font-tech text-tron-blue" : "font-serif text-dusty-blue"
            }`}
          >
            {member.name}
          </motion.h3>
          <p
            className={`text-xs mt-1 uppercase tracking-widest ${
              isDark ? "text-tron-accent" : "text-sage"
            }`}
          >
            {member.role}
          </p>

          {/* Tagline — only when spotlit */}
          <AnimatePresence>
            {isSpotlit && member.tagline && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
                className={`text-sm mt-2 italic ${
                  isDark ? "text-gray-400" : "text-warm-gray/80"
                }`}
              >
                "{member.tagline}"
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
