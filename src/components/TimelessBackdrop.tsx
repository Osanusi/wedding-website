import { motion } from "framer-motion";

interface TimelessBackdropProps {
  variant?: "page" | "hero" | "splash";
}

const splashChateauImage =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Ch%C3%A2teau%20de%20Chambord%20-%2019-08-2015%20-%20Arnaud%20Scherer.jpg?width=1600";

const variantClasses = {
  page: {
    floral: "opacity-45",
    vine: "opacity-35",
    glaze: "opacity-80",
    corner: "w-44 h-44 sm:w-64 sm:h-64",
    animateCorners: true,
    showCorners: true,
  },
  hero: {
    floral: "opacity-55",
    vine: "opacity-45",
    glaze: "opacity-90",
    corner: "w-40 h-40 sm:w-56 sm:h-56",
    animateCorners: true,
    showCorners: true,
  },
  splash: {
    floral: "opacity-65",
    vine: "opacity-50",
    glaze: "opacity-100",
    corner: "w-48 h-48 sm:w-72 sm:h-72",
    animateCorners: false,
    showCorners: false,
  },
} as const;

const cornerPlacements = [
  "top-0 left-0",
  "top-0 right-0 rotate-90",
  "bottom-0 right-0 rotate-180",
  "bottom-0 left-0 -rotate-90",
];

export default function TimelessBackdrop({
  variant = "page",
}: TimelessBackdropProps) {
  const styles = variantClasses[variant];

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none isolate bg-beige"
      style={{ contain: "paint" }}
      aria-hidden="true"
    >
      {variant === "splash" && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${splashChateauImage})` }}
        />
      )}
      <div
        className={variant === "splash" ? "absolute inset-0" : "absolute inset-0 timeless-parchment"}
        style={
          variant === "splash"
            ? {
                background:
                  "linear-gradient(135deg, rgba(255, 251, 244, 0.42) 0%, rgba(243, 232, 215, 0.34) 45%, rgba(250, 243, 233, 0.42) 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 42%)",
              }
            : undefined
        }
      />
      <div className={`absolute inset-0 timeless-brocade ${styles.glaze}`} />
      {variant === "splash" ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(243,232,215,0.16)_0%,rgba(251,245,236,0.04)_38%,rgba(184,143,74,0.12)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_42%,rgba(255,248,236,0.24)_0%,rgba(255,248,236,0)_42%),radial-gradient(circle_at_82%_28%,rgba(127,154,184,0.12)_0%,rgba(127,154,184,0)_36%)]" />
        </>
      ) : (
        <>
          <div
            className={`absolute inset-0 timeless-floral-pattern ${styles.floral}`}
          />
          <div
            className={`absolute inset-0 timeless-vine-pattern ${styles.vine}`}
          />
        </>
      )}

      <motion.div
        className="absolute -top-12 left-[8%] h-52 w-52 transform-gpu rounded-full bg-[radial-gradient(circle,rgba(191,161,97,0.24)_0%,rgba(191,161,97,0)_72%)] blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, 14, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-[10%] h-64 w-64 transform-gpu rounded-full bg-[radial-gradient(circle,rgba(133,163,193,0.24)_0%,rgba(133,163,193,0)_72%)] blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, -18, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 top-0 h-56 transform-gpu bg-[linear-gradient(180deg,rgba(255,251,244,0.72)_0%,rgba(255,251,244,0)_100%)]"
        animate={{ opacity: [0.4, 0.72, 0.45], y: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {styles.showCorners &&
        cornerPlacements.map((placement, index) => (
          <motion.div
            key={placement}
            className={`absolute ${placement} ${styles.corner} transform-gpu timeless-corner-ornament origin-center`}
            animate={
              styles.animateCorners
                ? {
                    x: index % 2 === 0 ? [0, 6, 0] : [0, -6, 0],
                    y: index < 2 ? [0, 8, 0] : [0, -8, 0],
                    rotate: [0, index % 2 === 0 ? 2 : -2, 0],
                  }
                : undefined
            }
            transition={
              styles.animateCorners
                ? {
                    duration: 16 + index * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : undefined
            }
          />
        ))}
    </div>
  );
}
