import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";

interface NetflixCardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  bgColor?: string;
  icon?: LucideIcon;
  iconVariant?: string;
  onClick?: () => void;
}

export default function NetflixCard({
  title,
  subtitle,
  imageUrl,
  bgColor = "bg-sage/30 dark:bg-tron-grid",
  icon,
  iconVariant,
  onClick,
}: NetflixCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`flex-shrink-0 w-64 sm:w-72 h-40 sm:h-44 rounded-lg overflow-hidden cursor-pointer
        snap-start relative group/card
        ${!icon && !imageUrl ? bgColor : ""}
        border border-sage/20 dark:border-tron-blue/10
        dark:hover:border-tron-blue/50 dark:hover:shadow-[0_0_20px_rgba(102,252,241,0.2)]
        hover:shadow-lg transition-shadow duration-300`}
    >
      {/* Placeholder Art */}
      {!imageUrl && icon && (
        <PlaceholderImage icon={icon} variant={iconVariant} />
      )}

      {/* Background Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
        />
      )}

      {/* Light-mode shimmer on hover */}
      <div className="dark:hidden absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Dark-mode scan sweep on hover */}
      <div className="hidden dark:block absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 animate-tron-scan bg-gradient-to-b from-transparent via-tron-blue/10 to-transparent" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-base font-serif dark:font-tech">
          {title}
        </h3>
        {subtitle && (
          <p className="text-white/70 text-sm mt-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
            {subtitle}
          </p>
        )}
      </div>

      {/* Tron Scanline Effect (dark mode only) */}
      <div className="hidden dark:block absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-20 transition-opacity bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(102,252,241,0.1)_2px,rgba(102,252,241,0.1)_4px)]" />
    </motion.div>
  );
}
