import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import type { Variants } from "framer-motion";
import {
  CalendarPlus,
  ChevronDown,
  ExternalLink,
  Heart,
  MapPin,
  Send,
  SkipForward,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ThemeMusicController from "../components/ThemeMusicController";
import { getGoogleCalendarUrl, weddingDetails } from "../data/weddingDetails";

// ────────────────────────────────────────────────────────────────────────────
// Act orchestration
// ────────────────────────────────────────────────────────────────────────────

type Act = "envelope" | "cathedral" | "ribbon" | "manor" | "card";

const ACT_DURATIONS: Partial<Record<Act, number>> = {
  cathedral: 4600,
  ribbon: 1400,
  manor: 4400,
};

const NEXT_ACT: Record<Act, Act> = {
  envelope: "cathedral",
  cathedral: "ribbon",
  ribbon: "manor",
  manor: "card",
  card: "card",
};

const eveningMoments = [
  {
    time: "11:30 AM",
    title: "Church Arrival",
    detail:
      "Settle in at Immaculate Conception Church before the ceremony begins.",
  },
  {
    time: "12:00 PM",
    title: "Ceremony",
    detail: "Vows beneath vaulted arches, with the people we love.",
  },
  {
    time: "3:30 PM",
    title: "Reception",
    detail:
      "Reception begins at Beacon Hill Manor with cocktails, toasts, and celebration.",
  },
];

const guestNotes = [
  {
    title: "Dress Code",
    detail:
      "Cocktail attire. Outdoor portions on grass — choose footwear accordingly.",
  },
  {
    title: "Dinner",
    detail:
      "A buffet-style dinner will follow the reception.",
  },
  {
    title: "Travel",
    detail: "Lodging and transportation guidance is on the Venues page.",
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Monogram — A & S inside a thin ring, reused everywhere
// ────────────────────────────────────────────────────────────────────────────

function Monogram({
  className = "",
  showRing = true,
}: {
  className?: string;
  showRing?: boolean;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {showRing && (
        <>
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            opacity="0.6"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.45"
            opacity="0.4"
          />
        </>
      )}
      <g fill="currentColor">
        <text
          x="30"
          y="64"
          textAnchor="middle"
          fontFamily="'Great Vibes', cursive"
          fontSize="40"
        >
          A
        </text>
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', serif"
          fontStyle="italic"
          fontSize="22"
          opacity="0.78"
        >
          &amp;
        </text>
        <text
          x="70"
          y="64"
          textAnchor="middle"
          fontFamily="'Great Vibes', cursive"
          fontSize="40"
        >
          S
        </text>
      </g>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Act 0 — Envelope intro
// ────────────────────────────────────────────────────────────────────────────

function EnvelopeIntro({
  guestName,
  onOpen,
  isDark,
}: {
  guestName: string | null;
  onOpen: () => void;
  isDark: boolean;
}) {
  return (
    <motion.div
      key="envelope"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 0.6 }}
    >
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_36%,rgba(255,253,247,0.95)_0%,rgba(243,232,215,0.96)_46%,rgba(216,196,160,0.9)_100%)] dark:bg-[radial-gradient(ellipse_at_50%_36%,rgba(31,40,51,0.96)_0%,rgba(13,13,13,0.98)_70%,#050608_100%)]" />

      {/* Floating gold dust */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 22 }).map((_, i) => {
          const left = (i * 47) % 100;
          const top = (i * 73) % 100;
          const size = 1 + (i % 3);
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-gilded-gold/50 dark:bg-tron-blue/55"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                filter: "blur(0.4px)",
              }}
              animate={{
                opacity: [0.2, 0.85, 0.2],
                y: [-4, 6, -4],
              }}
              transition={{
                duration: 4 + (i % 4),
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i % 6) * 0.4,
              }}
            />
          );
        })}
      </div>

      {/* Title */}
      <motion.div
        className="relative z-10 mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        <p className="text-[0.65rem] uppercase tracking-[0.42em] text-warm-gray/80 dark:font-tech dark:text-tron-blue/80">
          We are getting married
        </p>
        <p className="mt-3 font-serif text-3xl text-warm-gray dark:text-tron-blue/90 sm:text-4xl">
          {weddingDetails.coupleNames}
        </p>
        <p className="mt-1 text-[0.7rem] uppercase tracking-[0.3em] text-warm-gray/70 dark:text-tron-blue/60">
          {weddingDetails.dateDisplay}
        </p>
      </motion.div>

      {/* Envelope */}
      <motion.div
        className="relative aspect-[5/7] w-[min(82vw,26rem)]"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.85, ease: "easeOut" }}
      >
        <svg
          viewBox="0 0 500 700"
          className="absolute inset-0 h-full w-full drop-shadow-[0_28px_42px_rgba(82,63,37,0.32)] dark:drop-shadow-[0_28px_42px_rgba(102,252,241,0.18)]"
        >
          <defs>
            <linearGradient id="env-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FBF5EC" />
              <stop offset="0.5" stopColor="#F3E8D7" />
              <stop offset="1" stopColor="#E8D9BB" />
            </linearGradient>
            <linearGradient id="env-flap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFCF4" />
              <stop offset="1" stopColor="#E6D6B2" />
            </linearGradient>
            <linearGradient id="env-body-dark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1F2833" />
              <stop offset="1" stopColor="#0B0C10" />
            </linearGradient>
            <linearGradient id="env-flap-dark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2A3744" />
              <stop offset="1" stopColor="#0F1620" />
            </linearGradient>
            <pattern
              id="env-linen"
              x="0"
              y="0"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 0H6M0 3H6"
                stroke="rgba(120,98,68,0.07)"
                strokeWidth="0.5"
              />
              <path
                d="M0 0V6M3 0V6"
                stroke="rgba(120,98,68,0.05)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>

          {/* Envelope pocket (back of envelope shown closed) */}
          <rect
            x="20"
            y="20"
            width="460"
            height="660"
            rx="18"
            fill={isDark ? "url(#env-body-dark)" : "url(#env-body)"}
          />
          {!isDark && (
            <rect x="20" y="20" width="460" height="660" rx="18" fill="url(#env-linen)" />
          )}

          {/* Side flap shadows (folded edges) */}
          <polygon
            points="20,20 250,360 20,680"
            fill={isDark ? "#0B0C10" : "#D9C696"}
            opacity={isDark ? 0.4 : 0.18}
          />
          <polygon
            points="480,20 250,360 480,680"
            fill={isDark ? "#0B0C10" : "#D9C696"}
            opacity={isDark ? 0.4 : 0.18}
          />
          {/* Side fold lines */}
          <line
            x1="20"
            y1="20"
            x2="250"
            y2="360"
            stroke={isDark ? "#66FCF1" : "#B88F4A"}
            strokeWidth="0.6"
            opacity="0.32"
          />
          <line
            x1="480"
            y1="20"
            x2="250"
            y2="360"
            stroke={isDark ? "#66FCF1" : "#B88F4A"}
            strokeWidth="0.6"
            opacity="0.32"
          />
          <line
            x1="20"
            y1="680"
            x2="250"
            y2="360"
            stroke={isDark ? "#66FCF1" : "#B88F4A"}
            strokeWidth="0.6"
            opacity="0.32"
          />
          <line
            x1="480"
            y1="680"
            x2="250"
            y2="360"
            stroke={isDark ? "#66FCF1" : "#B88F4A"}
            strokeWidth="0.6"
            opacity="0.32"
          />

          {/* Top triangular flap */}
          <polygon
            points="20,20 480,20 250,360"
            fill={isDark ? "url(#env-flap-dark)" : "url(#env-flap)"}
            stroke={isDark ? "#66FCF1" : "#B88F4A"}
            strokeOpacity="0.32"
            strokeWidth="0.8"
          />
          {!isDark && (
            <polygon points="20,20 480,20 250,360" fill="url(#env-linen)" />
          )}

          {/* Border refinement */}
          <rect
            x="20"
            y="20"
            width="460"
            height="660"
            rx="18"
            fill="none"
            stroke={isDark ? "#66FCF1" : "#B88F4A"}
            strokeOpacity="0.45"
            strokeWidth="1"
          />

          {/* Address line */}
          <text
            x="250"
            y="115"
            textAnchor="middle"
            fontFamily="'Great Vibes', cursive"
            fontSize="34"
            fill={isDark ? "#A9F2EC" : "#7d6232"}
            opacity="0.88"
          >
            {guestName ? `to ${guestName}` : "to our beloved guest"}
          </text>
          <line
            x1="160"
            y1="138"
            x2="340"
            y2="138"
            stroke={isDark ? "#66FCF1" : "#B88F4A"}
            strokeOpacity="0.4"
            strokeWidth="0.8"
          />
        </svg>

        {/* Open invitation button */}
        <motion.button
          type="button"
          onClick={onOpen}
          aria-label="Open the invitation"
          className="group absolute left-1/2 top-[51%] z-10 flex h-[22%] w-[72%] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[1.6rem] border border-gilded-gold/55 bg-cream/92 px-5 py-4 text-center shadow-[0_18px_40px_rgba(82,63,37,0.16)] transition duration-300 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-gilded-gold dark:border-tron-blue/45 dark:bg-tron-grid/80"
          initial={{ scale: 0, rotate: -18 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.7, duration: 0.65, ease: "backOut" }}
        >
          <div className="flex flex-col items-center">
            <p className="text-[0.58rem] uppercase tracking-[0.42em] text-warm-gray/70 dark:font-tech dark:text-tron-blue/70">
              For a beautiful day
            </p>
            <p
              className="mt-2 text-4xl leading-none text-gilded-gold dark:text-tron-blue sm:text-5xl"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              celebration awaits
            </p>
            <p className="mt-2 text-[0.58rem] uppercase tracking-[0.34em] text-warm-gray/70 dark:text-tron-blue/68">
              with love and joy
            </p>
          </div>
        </motion.button>
      </motion.div>

      {/* Tap cue */}
      <motion.p
        className="relative z-10 mt-7 text-xs uppercase tracking-[0.4em] text-warm-gray/75 dark:font-tech dark:text-tron-blue/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{
          delay: 1.4,
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Tap to open
      </motion.p>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Act 1 — Cathedral scene (Immaculate Conception, twin Gothic spires)
// ────────────────────────────────────────────────────────────────────────────

function CathedralScene({ isDark }: { isDark: boolean }) {
  const stroke = isDark ? "#9CDCD8" : "#B88F4A";
  const accent = isDark ? "#66FCF1" : "#7F9AB8";
  const fill = isDark ? "#1F2833" : "#FBF5EC";

  return (
    <motion.div
      key="cathedral"
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="cath-sky" x1="0" y1="0" x2="0" y2="1">
            {isDark ? (
              <>
                <stop offset="0" stopColor="#06080C" />
                <stop offset="0.55" stopColor="#1F2833" />
                <stop offset="1" stopColor="#0B1420" />
              </>
            ) : (
              <>
                <stop offset="0" stopColor="#FBF5EC" />
                <stop offset="0.5" stopColor="#F3E8D7" />
                <stop offset="1" stopColor="#E2D2B8" />
              </>
            )}
          </linearGradient>
          <radialGradient id="cath-rose" cx="50%" cy="50%" r="55%">
            <stop offset="0" stopColor={accent} stopOpacity="0.95" />
            <stop offset="0.55" stopColor={accent} stopOpacity="0.22" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cath-beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={accent} stopOpacity="0.4" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="800" height="600" fill="url(#cath-sky)" />

        {isDark &&
          Array.from({ length: 50 }).map((_, i) => {
            const cx = (i * 137) % 800;
            const cy = ((i * 53) % 240) + 14;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={i % 4 === 0 ? 1.6 : 0.9}
                fill="#fff"
                opacity={0.85 - (i % 5) * 0.1}
              />
            );
          })}

        {/* Horizon glow */}
        <ellipse cx="400" cy="510" rx="700" ry="64" fill={accent} opacity="0.14" />

        {/* Animated light beams from rose window */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 1.4 }}
        >
          <polygon points="400,320 180,600 280,600" fill="url(#cath-beam)" />
          <polygon points="400,320 620,600 520,600" fill="url(#cath-beam)" />
          <polygon
            points="400,320 350,600 450,600"
            fill="url(#cath-beam)"
            opacity="0.75"
          />
        </motion.g>

        <motion.g
          stroke={stroke}
          fill="none"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 1.1, ease: "easeOut" }}
        >
          {/* Main facade body */}
          <rect x="260" y="260" width="280" height="200" fill={fill} fillOpacity="0.52" />
          {/* Pediment */}
          <polygon
            points="260,260 400,200 540,260"
            fill={fill}
            fillOpacity="0.52"
          />

          {/* Left tower */}
          <rect x="180" y="200" width="80" height="260" fill={fill} fillOpacity="0.52" />
          <polygon points="180,200 220,80 260,200" fill={fill} fillOpacity="0.52" />
          <line x1="220" y1="80" x2="220" y2="50" />
          <line x1="210" y1="62" x2="230" y2="62" />

          {/* Right tower */}
          <rect x="540" y="200" width="80" height="260" fill={fill} fillOpacity="0.52" />
          <polygon points="540,200 580,80 620,200" fill={fill} fillOpacity="0.52" />
          <line x1="580" y1="80" x2="580" y2="50" />
          <line x1="570" y1="62" x2="590" y2="62" />

          {/* Tower window arches */}
          <path d="M204 290 v40 a16 16 0 0 1 32 0 v-40 Z" />
          <path d="M564 290 v40 a16 16 0 0 1 32 0 v-40 Z" />
          <path d="M204 370 v36 a16 16 0 0 1 32 0 v-36 Z" />
          <path d="M564 370 v36 a16 16 0 0 1 32 0 v-36 Z" />

          {/* Side facade windows */}
          <path d="M285 320 v44 a14 14 0 0 1 28 0 v-44 Z" />
          <path d="M487 320 v44 a14 14 0 0 1 28 0 v-44 Z" />

          {/* Rose window — outer */}
          <circle cx="400" cy="320" r="46" fill="url(#cath-rose)" />
          <circle cx="400" cy="320" r="46" />
          <circle cx="400" cy="320" r="32" />
          <circle cx="400" cy="320" r="6" fill={accent} fillOpacity="0.9" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={`r1-${deg}`}
              x1="400"
              y1="320"
              x2={400 + 46 * Math.cos((deg * Math.PI) / 180)}
              y2={320 + 46 * Math.sin((deg * Math.PI) / 180)}
              opacity="0.7"
            />
          ))}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
            <line
              key={`r2-${deg}`}
              x1="400"
              y1="320"
              x2={400 + 32 * Math.cos((deg * Math.PI) / 180)}
              y2={320 + 32 * Math.sin((deg * Math.PI) / 180)}
              opacity="0.55"
            />
          ))}

          {/* Pointed arch entrance */}
          <path
            d="M370 460 L370 410 Q400 360 430 410 L430 460 Z"
            fill={fill}
            fillOpacity="0.66"
          />
          <line x1="400" y1="410" x2="400" y2="460" opacity="0.7" />

          {/* Steps */}
          <line x1="240" y1="470" x2="560" y2="470" />
          <line x1="218" y1="484" x2="582" y2="484" />
          <line x1="196" y1="498" x2="604" y2="498" />
        </motion.g>

        {/* Couple silhouettes ascending the steps */}
        <motion.g
          fill={isDark ? "#040608" : "#3a3025"}
          opacity="0.82"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.82, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9 }}
        >
          <path d="M386 522 q4 -6 8 0 v18 h-8 z" />
          <circle cx="390" cy="516" r="4.4" />
          <path d="M404 522 q5 -8 12 0 l3 22 h-15 z" />
          <circle cx="410" cy="514" r="4.8" />
        </motion.g>

        {/* Foreground candles flickering */}
        {[250, 320, 480, 550].map((cx, i) => (
          <g key={cx}>
            <rect
              x={cx - 1.5}
              y="540"
              width="3"
              height="14"
              fill={stroke}
              opacity="0.7"
            />
            <ellipse cx={cx} cy="538" rx="2.4" ry="4" fill={accent} opacity="0.85">
              <animate
                attributeName="ry"
                values="3.4;4.8;3.6"
                dur={`${1.6 + i * 0.18}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0.95;0.65"
                dur={`${1.6 + i * 0.18}s`}
                repeatCount="indefinite"
              />
            </ellipse>
          </g>
        ))}
      </svg>

      <SceneCaption
        kicker="The ceremony"
        title={weddingDetails.ceremonyVenue.name}
        subtitle={weddingDetails.ceremonyVenue.region}
        timing="12:00 PM"
      />
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Act 2 — Ribbon transition
// ────────────────────────────────────────────────────────────────────────────

function RibbonTransition({ isDark }: { isDark: boolean }) {
  const ribbon = isDark ? "#66FCF1" : "#FBF5EC";
  const ribbonShade = isDark ? "#45A29E" : "#B88F4A";
  return (
    <motion.div
      key="ribbon"
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,247,0.92)_0%,rgba(243,232,215,0.92)_100%)] dark:bg-[linear-gradient(180deg,rgba(11,12,16,0.95)_0%,rgba(31,40,51,0.95)_100%)]" />
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="ribbon-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={ribbon} stopOpacity="0.95" />
            <stop offset="1" stopColor={ribbonShade} stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -40 320 Q 200 220 400 340 T 840 300"
          fill="none"
          stroke="url(#ribbon-fill)"
          strokeWidth="48"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
        <motion.path
          d="M -40 320 Q 200 220 400 340 T 840 300"
          fill="none"
          stroke={isDark ? "#1F2833" : "#7d6232"}
          strokeOpacity="0.18"
          strokeWidth="48"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Act 3 — Beacon Hill Manor scene
// ────────────────────────────────────────────────────────────────────────────

function ManorScene({ isDark }: { isDark: boolean }) {
  const stroke = isDark ? "#9CDCD8" : "#B88F4A";
  const accent = isDark ? "#66FCF1" : "#7F9AB8";
  const fill = isDark ? "#1F2833" : "#FBF5EC";
  const lantern = isDark ? "#66FCF1" : "#FFD580";

  return (
    <motion.div
      key="manor"
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="manor-sky" x1="0" y1="0" x2="0" y2="1">
            {isDark ? (
              <>
                <stop offset="0" stopColor="#06080C" />
                <stop offset="0.7" stopColor="#1F2833" />
                <stop offset="1" stopColor="#0E1620" />
              </>
            ) : (
              <>
                <stop offset="0" stopColor="#E0CDA0" />
                <stop offset="0.45" stopColor="#F3E8D7" />
                <stop offset="1" stopColor="#FBF5EC" />
              </>
            )}
          </linearGradient>
          <radialGradient id="manor-moon" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor={accent} stopOpacity="0.9" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="800" height="600" fill="url(#manor-sky)" />

        {/* Moon / sun */}
        <circle cx="640" cy="140" r="56" fill="url(#manor-moon)" />
        <circle
          cx="640"
          cy="140"
          r="26"
          fill={isDark ? "#FFFFFF" : "#FFE8C2"}
          opacity={isDark ? 0.94 : 0.82}
        />

        {isDark &&
          Array.from({ length: 36 }).map((_, i) => {
            const cx = (i * 89) % 800;
            const cy = ((i * 41) % 220) + 24;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={i % 4 === 0 ? 1.6 : 0.9}
                fill="#fff"
                opacity={0.85 - (i % 5) * 0.1}
              />
            );
          })}

        {/* Distant hills */}
        <path
          d="M-10 380 Q120 340 240 360 T520 350 T820 365 L820 600 L-10 600 Z"
          fill={isDark ? "#0F1620" : "#D2BD83"}
          opacity={isDark ? 0.7 : 0.55}
        />

        {/* Trees flanking */}
        {[
          { cx: 110, base: 440 },
          { cx: 690, base: 440 },
        ].map((t) => (
          <g key={t.cx}>
            <rect
              x={t.cx - 4}
              y={t.base - 60}
              width="8"
              height="80"
              fill={stroke}
              opacity="0.78"
            />
            <circle
              cx={t.cx - 22}
              cy={t.base - 80}
              r="32"
              fill={isDark ? "#1F2833" : "#BCAE74"}
              stroke={stroke}
              strokeWidth="1"
            />
            <circle
              cx={t.cx + 18}
              cy={t.base - 84}
              r="28"
              fill={isDark ? "#1F2833" : "#BCAE74"}
              stroke={stroke}
              strokeWidth="1"
            />
            <circle
              cx={t.cx}
              cy={t.base - 110}
              r="30"
              fill={isDark ? "#1F2833" : "#BCAE74"}
              stroke={stroke}
              strokeWidth="1"
            />
          </g>
        ))}

        <motion.g
          stroke={stroke}
          fill={fill}
          fillOpacity="0.55"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        >
          {/* Main manor body */}
          <rect x="180" y="320" width="440" height="140" />
          {/* Roof */}
          <polygon points="180,320 400,260 620,320" />
          {/* Central portico */}
          <rect x="350" y="300" width="100" height="160" />
          <polygon points="340,300 400,250 460,300" />
          {/* Columns */}
          <rect x="356" y="320" width="6" height="140" fillOpacity="0.85" />
          <rect x="372" y="320" width="6" height="140" fillOpacity="0.85" />
          <rect x="422" y="320" width="6" height="140" fillOpacity="0.85" />
          <rect x="438" y="320" width="6" height="140" fillOpacity="0.85" />
          {/* Door */}
          <rect
            x="384"
            y="380"
            width="32"
            height="80"
            fill={isDark ? "#0B0C10" : "#7d6232"}
            fillOpacity="0.85"
          />
          <line x1="400" y1="380" x2="400" y2="460" opacity="0.7" />
          {/* Windows left */}
          {[210, 250, 290].map((x) => (
            <g key={`wl-${x}`}>
              <rect x={x} y="350" width="22" height="30" />
              <line x1={x + 11} y1="350" x2={x + 11} y2="380" />
              <line x1={x} y1="365" x2={x + 22} y2="365" />
            </g>
          ))}
          {/* Windows right */}
          {[490, 530, 570].map((x) => (
            <g key={`wr-${x}`}>
              <rect x={x} y="350" width="22" height="30" />
              <line x1={x + 11} y1="350" x2={x + 11} y2="380" />
              <line x1={x} y1="365" x2={x + 22} y2="365" />
            </g>
          ))}
          {/* Chimney */}
          <rect x="220" y="240" width="20" height="30" />
        </motion.g>

        {/* Warm window glow */}
        {[210, 250, 290, 490, 530, 570].map((x) => (
          <rect
            key={`glow-${x}`}
            x={x + 1}
            y="351"
            width="20"
            height="28"
            fill={lantern}
            opacity={isDark ? 0.38 : 0.42}
          />
        ))}

        {/* Ground */}
        <rect
          x="0"
          y="460"
          width="800"
          height="140"
          fill={isDark ? "#0B0C10" : "#C7B47C"}
          opacity={isDark ? 0.95 : 0.85}
        />
        {/* Path */}
        <polygon
          points="380,460 420,460 480,600 320,600"
          fill={isDark ? "#1F2833" : "#E6D49B"}
          opacity="0.75"
        />

        {/* Lanterns */}
        {[
          { x: 348, y: 498 },
          { x: 452, y: 498 },
          { x: 318, y: 540 },
          { x: 482, y: 540 },
          { x: 290, y: 582 },
          { x: 510, y: 582 },
        ].map((p, i) => (
          <g key={`${p.x}-${p.y}`}>
            <line
              x1={p.x}
              y1={p.y}
              x2={p.x}
              y2={p.y + 14}
              stroke={stroke}
              strokeWidth="1"
            />
            <circle cx={p.x} cy={p.y} r="3.8" fill={lantern} opacity="0.9">
              <animate
                attributeName="r"
                values="3.4;4.6;3.6"
                dur={`${1.8 + i * 0.2}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={p.x} cy={p.y} r="10" fill={lantern} opacity="0.2" />
          </g>
        ))}
      </svg>

      <SceneCaption
        kicker="The celebration"
        title={weddingDetails.venue.name}
        subtitle={weddingDetails.venue.region}
        timing="3:30 PM"
      />
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Scene caption overlay
// ────────────────────────────────────────────────────────────────────────────

function SceneCaption({
  kicker,
  title,
  subtitle,
  timing,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  timing: string;
}) {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-[12%] flex flex-col items-center px-6 text-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
    >
      <p className="text-[0.7rem] uppercase tracking-[0.5em] text-warm-gray dark:font-tech dark:text-tron-blue/80">
        {kicker}
      </p>
      <p className="mt-3 font-serif text-3xl text-warm-gray dark:text-tron-blue sm:text-4xl">
        {title}
      </p>
      <p className="mt-2 text-sm text-warm-gray/80 dark:text-tron-blue/70">
        {subtitle} · {timing}
      </p>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Act 4 — Invitation card (final, scrollable)
// ────────────────────────────────────────────────────────────────────────────

function InvitationCard({
  guestName,
  calendarUrl,
  reducedMotion,
}: {
  guestName: string | null;
  calendarUrl: string;
  reducedMotion: boolean;
}) {
  const fadeUp: Variants = reducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
      };

  return (
    <motion.div
      key="card"
      className="absolute inset-0 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_18%,rgba(255,253,247,0.95)_0%,rgba(243,232,215,0.95)_50%,rgba(216,196,160,0.92)_100%)] dark:bg-[radial-gradient(ellipse_at_30%_18%,rgba(31,40,51,0.96)_0%,rgba(13,13,13,0.98)_60%,#050608_100%)]" />

      <div className="relative mx-auto flex min-h-full w-full max-w-5xl items-start px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div
          className="w-full rounded-[1.8rem] border border-gilded-gold/28 bg-cream/90 px-5 py-8 shadow-[0_28px_60px_rgba(82,63,37,0.16)] backdrop-blur dark:border-tron-blue/30 dark:bg-tron-grid/82 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
        >
          {/* Hero */}
          <motion.div
            className="flex flex-col items-center text-center"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <Monogram className="h-18 w-18 text-gilded-gold dark:text-tron-blue sm:h-22 sm:w-22" />
            <p
              className="mt-6 max-w-[14ch] text-3xl leading-none text-gilded-gold dark:text-tron-blue sm:text-4xl"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {guestName ?? "Dear guest"}
            </p>
            <h1 className="mt-4 max-w-[12ch] font-serif text-5xl leading-[0.92] text-warm-gray dark:text-tron-blue sm:text-6xl lg:text-7xl">
              {weddingDetails.coupleNames}
            </h1>
            <p className="mt-4 text-sm uppercase tracking-[0.34em] text-warm-gray/80 dark:text-tron-blue/70">
              request your presence
            </p>
            <p className="mt-6 font-serif text-2xl italic text-warm-gray dark:text-tron-blue/90 sm:text-3xl">
              {weddingDetails.dateLongDisplay}
            </p>
            <Link
              to="/rsvp"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gilded-gold px-7 py-3 text-sm uppercase tracking-[0.32em] text-cream shadow-[0_18px_40px_rgba(184,143,74,0.32)] transition hover:bg-[#9c7a3e] dark:bg-tron-blue dark:text-tron-black dark:shadow-[0_18px_40px_rgba(102,252,241,0.32)] dark:hover:bg-tron-accent"
            >
              <Send className="h-4 w-4" />
              RSVP
            </Link>
            <p className="mt-5 text-[0.68rem] uppercase tracking-[0.34em] text-warm-gray/80 dark:font-tech dark:text-tron-blue/70">
              to be held at
            </p>
          </motion.div>

          {/* Two venues */}
          <motion.div
            className="mt-12 grid w-full gap-5 lg:grid-cols-2"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.12 }}
          >
            <VenueCard
              kicker="Ceremony · 12:00 PM"
              name={weddingDetails.ceremonyVenue.name}
              line={weddingDetails.ceremonyVenue.region}
              description={weddingDetails.ceremonyVenue.description}
              mapUrl={weddingDetails.ceremonyVenue.mapUrl}
              websiteUrl={weddingDetails.ceremonyVenue.websiteUrl}
            />
            <VenueCard
              kicker="Reception · 3:30 PM"
              name={weddingDetails.venue.name}
              line={`${weddingDetails.venue.addressLine1}, ${weddingDetails.venue.addressLine2}`}
              description={weddingDetails.venue.description}
              mapUrl={weddingDetails.venue.mapUrl}
              websiteUrl={weddingDetails.venue.websiteUrl}
            />
          </motion.div>

          {/* Schedule */}
          <motion.section
            className="mt-12 w-full"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-center text-[0.68rem] uppercase tracking-[0.45em] text-warm-gray/85 dark:font-tech dark:text-tron-blue/80">
              The timeline
            </h2>
            <ol className="relative mt-6 border-l border-gilded-gold/40 pl-6 dark:border-tron-blue/40">
              {eveningMoments.map((moment) => (
                <li key={moment.title} className="relative pb-6 last:pb-0">
                  <span className="absolute -left-[29px] top-2 h-2.5 w-2.5 rounded-full bg-gilded-gold shadow-[0_0_0_3px_rgba(184,143,74,0.18)] dark:bg-tron-blue dark:shadow-[0_0_0_3px_rgba(102,252,241,0.22)]" />
                  <p className="text-xs uppercase tracking-[0.35em] text-warm-gray/75 dark:text-tron-blue/70">
                    {moment.time}
                  </p>
                  <p className="mt-1 font-serif text-xl text-warm-gray dark:text-tron-blue">
                    {moment.title}
                  </p>
                  <p className="mt-1 text-sm text-warm-gray/85 dark:text-tron-blue/75">
                    {moment.detail}
                  </p>
                </li>
              ))}
            </ol>
          </motion.section>

          {/* Guest notes */}
          <motion.section
            className="mt-12 grid w-full gap-4 sm:grid-cols-3"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.28 }}
          >
            {guestNotes.map((note) => (
              <div
                key={note.title}
                className="rounded-2xl border border-gilded-gold/30 bg-cream/85 p-4 text-warm-gray shadow-[0_12px_24px_rgba(82,63,37,0.08)] backdrop-blur dark:border-tron-blue/40 dark:bg-tron-grid/75 dark:text-tron-blue/90"
              >
                <p className="text-[0.64rem] uppercase tracking-[0.4em] text-warm-gray/80 dark:font-tech dark:text-tron-blue/70">
                  {note.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed">{note.detail}</p>
              </div>
            ))}
          </motion.section>

          {/* CTAs */}
          <motion.div
            className="mt-12 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.36 }}
          >
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gilded-gold/60 px-7 py-3 text-sm uppercase tracking-[0.32em] text-warm-gray transition hover:bg-gilded-gold/10 dark:border-tron-blue/60 dark:text-tron-blue dark:hover:bg-tron-blue/10"
            >
              <CalendarPlus className="h-4 w-4" />
              Add to calendar
            </a>
            <Link
              to="/"
              state={{ skipSplash: true }}
              className="text-center text-xs uppercase tracking-[0.42em] text-warm-gray/75 underline-offset-4 hover:underline dark:text-tron-blue/70 sm:self-center"
            >
              Open wedding website
            </Link>
          </motion.div>

          <p className="mt-12 flex items-center justify-center gap-2 text-[0.65rem] uppercase tracking-[0.4em] text-warm-gray/70 dark:font-tech dark:text-tron-blue/60">
            <Heart className="h-3 w-3" />
            With love, Angel & Seun
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function VenueCard({
  kicker,
  name,
  line,
  description,
  mapUrl,
  websiteUrl,
}: {
  kicker: string;
  name: string;
  line: string;
  description: string;
  mapUrl: string;
  websiteUrl: string;
}) {
  return (
    <div className="rounded-3xl border border-gilded-gold/30 bg-cream/90 p-6 text-warm-gray shadow-[0_18px_40px_rgba(82,63,37,0.12)] backdrop-blur dark:border-tron-blue/40 dark:bg-tron-grid/80 dark:text-tron-blue/90">
      <p className="text-[0.65rem] uppercase tracking-[0.4em] text-warm-gray/75 dark:font-tech dark:text-tron-blue/70">
        {kicker}
      </p>
      <p className="mt-3 font-serif text-2xl text-warm-gray dark:text-tron-blue">
        {name}
      </p>
      <p className="mt-1 flex items-start gap-1.5 text-sm text-warm-gray/85 dark:text-tron-blue/75">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        {line}
      </p>
      <p className="mt-4 text-sm leading-relaxed">{description}</p>
      <div className="mt-5 flex flex-wrap gap-3 text-xs uppercase tracking-[0.32em]">
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-gilded-gold transition hover:text-[#9c7a3e] dark:text-tron-blue dark:hover:text-tron-accent"
        >
          Directions
          <ExternalLink className="h-3 w-3" />
        </a>
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-warm-gray/80 transition hover:text-warm-gray dark:text-tron-blue/70 dark:hover:text-tron-blue"
        >
          Website
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Main page
// ────────────────────────────────────────────────────────────────────────────

export default function Invite() {
  const [searchParams] = useSearchParams();
  const guestName = useMemo(() => {
    const raw = searchParams.get("to") ?? searchParams.get("guest");
    return raw ? raw.trim() : null;
  }, [searchParams]);

  const reducedMotion = useReducedMotion() ?? false;

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const [act, setAct] = useState<Act>(reducedMotion ? "card" : "envelope");
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAdvance = useCallback(() => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  }, []);

  // Auto-advance acts after the envelope is opened
  useEffect(() => {
    clearAdvance();
    if (act === "envelope" || act === "card") return;
    const duration = ACT_DURATIONS[act] ?? 3500;
    advanceTimer.current = setTimeout(() => {
      setAct((current) => NEXT_ACT[current]);
    }, duration);
    return clearAdvance;
  }, [act, clearAdvance]);

  // Lock body scroll until we reach the card
  useEffect(() => {
    if (act === "card") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [act]);

  const handleOpen = useCallback(() => {
    setAct("cathedral");
  }, []);

  const handleSkip = useCallback(() => {
    clearAdvance();
    setAct("card");
  }, [clearAdvance]);

  const calendarUrl = useMemo(() => getGoogleCalendarUrl(), []);

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-cream text-warm-gray dark:bg-tron-black dark:text-tron-blue">
      <div className="relative h-dvh w-full">
        <AnimatePresence mode="wait">
          {act === "envelope" && (
            <EnvelopeIntro
              key="act-envelope"
              guestName={guestName}
              onOpen={handleOpen}
              isDark={isDark}
            />
          )}
          {act === "cathedral" && (
            <CathedralScene key="act-cathedral" isDark={isDark} />
          )}
          {act === "ribbon" && (
            <RibbonTransition key="act-ribbon" isDark={isDark} />
          )}
          {act === "manor" && (
            <ManorScene key="act-manor" isDark={isDark} />
          )}
          {act === "card" && (
            <InvitationCard
              key="act-card"
              guestName={guestName}
              calendarUrl={calendarUrl}
              reducedMotion={reducedMotion}
            />
          )}
        </AnimatePresence>

        {/* Floating controls */}
        {act !== "envelope" && act !== "card" && (
          <button
            type="button"
            onClick={handleSkip}
            className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-gilded-gold/40 bg-cream/80 px-4 py-2 text-[0.6rem] uppercase tracking-[0.32em] text-warm-gray backdrop-blur transition hover:bg-cream dark:border-tron-blue/40 dark:bg-tron-grid/70 dark:text-tron-blue dark:hover:bg-tron-grid"
            aria-label="Skip to invitation"
          >
            <SkipForward className="h-3.5 w-3.5" />
            Skip
          </button>
        )}

        {act === "card" && (
          <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center">
            <ChevronDown className="h-5 w-5 animate-bounce text-warm-gray/60 dark:text-tron-blue/60" />
          </div>
        )}
      </div>

      <ThemeMusicController isDark={isDark} setIsDark={setIsDark} />
    </main>
  );
}
