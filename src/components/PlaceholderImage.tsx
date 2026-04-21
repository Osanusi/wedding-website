import type { LucideIcon } from "lucide-react";

const lightBg: Record<string, string> = {
  sage: "from-sage/40 via-sage/15 to-cream",
  blue: "from-dusty-blue/25 via-dusty-blue/10 to-beige",
  cream: "from-cream via-beige to-sage/15",
  blush: "from-sage/20 via-cream to-dusty-blue/15",
};

const lightIconColor: Record<string, string> = {
  sage: "text-sage",
  blue: "text-dusty-blue",
  cream: "text-warm-gray",
  blush: "text-dusty-blue/80",
};

interface PlaceholderImageProps {
  icon: LucideIcon;
  variant?: string;
}

export default function PlaceholderImage({
  icon: Icon,
  variant = "sage",
}: PlaceholderImageProps) {
  const bg = lightBg[variant] ?? lightBg.sage;
  const iconClr = lightIconColor[variant] ?? lightIconColor.sage;

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* ── Light / Timeless ── */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bg} dark:opacity-0 transition-opacity duration-500`}
      >
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #8B8589 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        {/* Decorative ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-current opacity-[0.06]" />
        {/* Icon */}
        <div
          className={`absolute inset-0 flex items-center justify-center opacity-40 ${iconClr}`}
        >
          <Icon size={44} strokeWidth={1.2} />
        </div>
      </div>

      {/* ── Dark / Tron ── */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-tron-dark via-tron-grid/80 to-tron-dark">
        {/* Neon grid */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(102,252,241,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(102,252,241,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
        {/* Circuit corner accents */}
        <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-tron-blue/30 rounded-tl-sm" />
        <div className="absolute top-2 right-2 w-5 h-5 border-t border-r border-tron-blue/20 rounded-tr-sm" />
        <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-tron-blue/20 rounded-bl-sm" />
        <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-tron-blue/30 rounded-br-sm" />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-tron-blue/8 rounded-full blur-xl" />
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-tron-blue/40">
          <Icon
            size={44}
            strokeWidth={1.2}
            className="drop-shadow-[0_0_8px_rgba(102,252,241,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}
