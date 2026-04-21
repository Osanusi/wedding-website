/**
 * Inline silhouette SVGs for the wedding party.
 * Each renders at the given size with transparent backgrounds.
 * Designed to look great in both light (warm fill) and dark (neon stroke) modes.
 */

interface SilhouetteProps {
  className?: string;
  size?: number;
}

/** Feminine silhouette — long dress, updo hairstyle */
export function BrideSilhouette({
  className = "",
  size = 200,
}: SilhouetteProps) {
  return (
    <svg
      viewBox="0 0 200 400"
      width={size}
      height={size * 2}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Head */}
      <ellipse cx="100" cy="52" rx="28" ry="32" fill="currentColor" />
      {/* Hair updo */}
      <ellipse cx="100" cy="28" rx="20" ry="14" fill="currentColor" />
      <ellipse cx="85" cy="38" rx="8" ry="12" fill="currentColor" />
      {/* Neck */}
      <rect x="90" y="80" width="20" height="18" rx="4" fill="currentColor" />
      {/* Shoulders + bodice */}
      <path
        d="M60 98 Q70 92 100 95 Q130 92 140 98 L145 140 Q130 145 100 148 Q70 145 55 140 Z"
        fill="currentColor"
      />
      {/* Waist */}
      <path
        d="M65 140 Q80 152 100 155 Q120 152 135 140 L130 175 Q115 180 100 182 Q85 180 70 175 Z"
        fill="currentColor"
      />
      {/* Dress flare */}
      <path
        d="M70 175 Q50 250 35 370 Q70 380 100 382 Q130 380 165 370 Q150 250 130 175 Q115 180 100 182 Q85 180 70 175 Z"
        fill="currentColor"
      />
      {/* Left arm */}
      <path
        d="M60 100 Q42 120 38 160 Q35 170 40 172 Q48 168 55 148 Q60 130 65 115"
        fill="currentColor"
      />
      {/* Right arm — holding bouquet pose */}
      <path
        d="M140 100 Q155 118 158 145 Q160 152 156 154 Q150 150 145 135 Q140 120 138 110"
        fill="currentColor"
      />
      {/* Bouquet hint */}
      <ellipse
        cx="158"
        cy="158"
        rx="12"
        ry="10"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

/** Masculine silhouette — suit, tie, sharp shoulders */
export function GroomSilhouette({
  className = "",
  size = 200,
}: SilhouetteProps) {
  return (
    <svg
      viewBox="0 0 200 400"
      width={size}
      height={size * 2}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Head */}
      <ellipse cx="100" cy="50" rx="26" ry="30" fill="currentColor" />
      {/* Short hair */}
      <path
        d="M74 40 Q80 22 100 18 Q120 22 126 40 Q120 30 100 28 Q80 30 74 40 Z"
        fill="currentColor"
      />
      {/* Neck */}
      <rect x="88" y="76" width="24" height="20" rx="4" fill="currentColor" />
      {/* Shoulders — broader */}
      <path
        d="M48 96 Q65 88 100 92 Q135 88 152 96 L155 130 Q135 136 100 138 Q65 136 45 130 Z"
        fill="currentColor"
      />
      {/* Lapel / suit jacket */}
      <path
        d="M55 130 L60 240 Q80 248 100 250 Q120 248 140 240 L145 130 Q130 136 100 138 Q70 136 55 130 Z"
        fill="currentColor"
      />
      {/* Tie */}
      <path d="M95 96 L100 130 L105 96 Z" fill="currentColor" opacity="0.5" />
      {/* Trousers */}
      <path d="M65 240 L58 380 L82 380 L95 280 L100 250" fill="currentColor" />
      <path
        d="M135 240 L142 380 L118 380 L105 280 L100 250"
        fill="currentColor"
      />
      {/* Left arm */}
      <path
        d="M48 98 Q30 120 28 165 Q26 175 32 176 Q38 170 40 155 Q44 130 50 112"
        fill="currentColor"
      />
      {/* Right arm */}
      <path
        d="M152 98 Q170 120 172 165 Q174 175 168 176 Q162 170 160 155 Q156 130 150 112"
        fill="currentColor"
      />
    </svg>
  );
}

/** Maid of Honor — slightly different dress with sash hint */
export function MaidOfHonorSilhouette({
  className = "",
  size = 200,
}: SilhouetteProps) {
  return (
    <svg
      viewBox="0 0 200 400"
      width={size}
      height={size * 2}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Head */}
      <ellipse cx="100" cy="52" rx="28" ry="32" fill="currentColor" />
      {/* Hair — side swept */}
      <path
        d="M72 42 Q75 20 100 16 Q125 20 128 42 Q120 28 100 26 Q80 28 72 42 Z"
        fill="currentColor"
      />
      <ellipse cx="124" cy="38" rx="10" ry="14" fill="currentColor" />
      {/* Neck */}
      <rect x="90" y="80" width="20" height="18" rx="4" fill="currentColor" />
      {/* Shoulders + bodice */}
      <path
        d="M58 98 Q72 90 100 94 Q128 90 142 98 L144 138 Q128 144 100 146 Q72 144 56 138 Z"
        fill="currentColor"
      />
      {/* Sash across bodice */}
      <path
        d="M65 115 Q82 108 135 125"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.3"
        fill="none"
      />
      {/* Dress — A-line */}
      <path
        d="M66 138 Q52 240 42 370 Q72 382 100 384 Q128 382 158 370 Q148 240 134 138 Q120 144 100 146 Q80 144 66 138 Z"
        fill="currentColor"
      />
      {/* Left arm */}
      <path
        d="M58 100 Q40 122 36 162 Q34 172 40 174 Q46 168 50 150 Q55 132 60 115"
        fill="currentColor"
      />
      {/* Right arm */}
      <path
        d="M142 100 Q158 120 160 155 Q162 164 158 166 Q152 160 148 142 Q144 125 140 112"
        fill="currentColor"
      />
    </svg>
  );
}

/** Best Man — similar to groom but with pocket square hint */
export function BestManSilhouette({
  className = "",
  size = 200,
}: SilhouetteProps) {
  return (
    <svg
      viewBox="0 0 200 400"
      width={size}
      height={size * 2}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Head */}
      <ellipse cx="100" cy="50" rx="26" ry="30" fill="currentColor" />
      {/* Hair */}
      <path
        d="M74 40 Q80 22 100 18 Q120 22 126 40 Q118 28 100 26 Q82 28 74 40 Z"
        fill="currentColor"
      />
      {/* Neck */}
      <rect x="88" y="76" width="24" height="20" rx="4" fill="currentColor" />
      {/* Shoulders */}
      <path
        d="M48 96 Q65 88 100 92 Q135 88 152 96 L155 130 Q135 136 100 138 Q65 136 45 130 Z"
        fill="currentColor"
      />
      {/* Suit jacket */}
      <path
        d="M55 130 L60 240 Q80 248 100 250 Q120 248 140 240 L145 130 Q130 136 100 138 Q70 136 55 130 Z"
        fill="currentColor"
      />
      {/* Tie */}
      <path d="M95 96 L100 130 L105 96 Z" fill="currentColor" opacity="0.5" />
      {/* Pocket square */}
      <path
        d="M130 135 L138 132 L136 144 Z"
        fill="currentColor"
        opacity="0.4"
      />
      {/* Trousers */}
      <path d="M65 240 L58 380 L82 380 L95 280 L100 250" fill="currentColor" />
      <path
        d="M135 240 L142 380 L118 380 L105 280 L100 250"
        fill="currentColor"
      />
      {/* Arms */}
      <path
        d="M48 98 Q30 120 28 165 Q26 175 32 176 Q38 170 40 155 Q44 130 50 112"
        fill="currentColor"
      />
      <path
        d="M152 98 Q170 120 172 165 Q174 175 168 176 Q162 170 160 155 Q156 130 150 112"
        fill="currentColor"
      />
    </svg>
  );
}
