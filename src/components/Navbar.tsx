import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/our-story", label: "Our Story" },
  { to: "/wedding-day", label: "Wedding Day" },
  { to: "/venues", label: "Venues" },
  { to: "/registry", label: "Registry" },
  { to: "/rsvp", label: "RSVP" },
  { to: "/contact", label: "Contact" },
];

interface NavbarProps {
  isDark: boolean;
}

export default function Navbar({ isDark }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  /** Navigate to Home and dispatch event to re-show the splash screen */
  const goToSplash = () => {
    window.dispatchEvent(new CustomEvent("reset-splash"));
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-beige/90 dark:bg-tron-black/90 border-b border-sage/20 dark:border-tron-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Names — goes back to splash */}
          <button
            onClick={goToSplash}
            className="flex items-center gap-1 cursor-pointer"
          >
            <span className="text-2xl text-dusty-blue">
              <span className="font-initial align-[0.02em]">A</span>
              <span className="font-medieval italic font-medium tracking-[0.03em]">
                ngel
              </span>
            </span>
            <span
              className={`text-lg mx-0.5 ${
                isDark ? "text-gray-500" : "text-warm-gray/60"
              }`}
            >
              &
            </span>
            <span
              className={`text-xl font-semibold tracking-wide ${
                isDark
                  ? "font-tech text-tron-blue animate-glow-pulse"
                  : "font-serif text-dusty-blue"
              }`}
            >
              Seun
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? isDark
                        ? "text-tron-blue bg-tron-grid shadow-[0_0_10px_rgba(102,252,241,0.3)]"
                        : "text-dusty-blue bg-sage/20"
                      : isDark
                        ? "text-gray-400 hover:text-tron-blue hover:bg-tron-grid/50"
                        : "text-warm-gray hover:text-dusty-blue hover:bg-sage/10"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-warm-gray dark:text-tron-blue"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-sage/20 dark:border-tron-blue/20"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-all ${
                      isActive
                        ? isDark
                          ? "text-tron-blue bg-tron-grid"
                          : "text-dusty-blue bg-sage/20"
                        : isDark
                          ? "text-gray-400 hover:text-tron-blue"
                          : "text-warm-gray hover:text-dusty-blue"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
