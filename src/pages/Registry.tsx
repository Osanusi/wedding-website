import { useState, type ComponentType } from "react";
import { useOutletContext } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  X,
  Wallet,
  Heart,
  Home,
} from "lucide-react";
import PageTransition from "../components/PageTransition";

type RegistryFund = {
  icon: ComponentType<{ size?: number }>;
  title: string;
  description: string;
  inPersonOnly?: boolean;
};

const categories = [
  {
    icon: Wallet,
    title: "General Cash Gift",
    description:
      "If you'd like to bless us with a gift, we are accepting cash contributions as we start married life.",
    inPersonOnly: true,
  },
  {
    icon: Home,
    title: "Home Fund",
    description:
      "Help us furnish, decorate, and tackle first-year projects in our new home.",
  },
  {
    icon: Heart,
    title: "Honeymoon Fund",
    description:
      "Support our first adventure as newlyweds with experiences, meals, and travel costs.",
  },
] satisfies RegistryFund[];

const PAYMENT_LINKS = {
  paypal: import.meta.env.VITE_PAYPAL_ME_URL || "https://www.paypal.com/paypalme/",
  venmo: import.meta.env.VITE_VENMO_URL || "https://venmo.com/",
};

export default function Registry() {
  const { isDark } = useOutletContext<{ isDark: boolean }>();
  const [selectedFund, setSelectedFund] = useState<RegistryFund | null>(null);

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-16 pb-8 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl sm:text-6xl font-bold mb-4 ${
            isDark
              ? "font-tech text-tron-blue animate-glow-pulse"
              : "font-serif text-dusty-blue"
          }`}
        >
          Registry
        </motion.h1>
        <p
          className={`text-lg max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-warm-gray"}`}
        >
          Your presence is our greatest gift. If you would still like to bless
          us, we are doing a cash-only registry.
        </p>
      </section>

      {/* Categories */}
      <section className="max-w-4xl mx-auto px-4 pb-12 space-y-6">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row gap-6 ${
                isDark
                  ? "bg-tron-grid border border-tron-blue/10 hover:border-tron-blue/30"
                  : "bg-white/80 border border-sage/20 shadow-lg hover:shadow-xl"
              } transition-all duration-300`}
            >
              <div
                className={`w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center ${
                  isDark
                    ? "bg-tron-blue/10 text-tron-blue"
                    : "bg-sage/20 text-dusty-blue"
                }`}
              >
                <Icon size={28} />
              </div>
              <div className="flex-1">
                <h3
                  className={`text-xl font-bold ${
                    isDark
                      ? "text-tron-blue font-tech"
                      : "text-dusty-blue font-serif"
                  }`}
                >
                  {cat.title}
                </h3>
                <p
                  className={`text-sm mt-3 leading-relaxed ${isDark ? "text-gray-400" : "text-warm-gray"}`}
                >
                  {cat.description}
                </p>
                {cat.inPersonOnly ? (
                  <p
                    className={`mt-4 text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? "text-tron-accent" : "text-sage"}`}
                  >
                    In person at the wedding venue
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedFund(cat)}
                    className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                      isDark
                        ? "border border-tron-blue/40 text-tron-blue hover:bg-tron-blue/10"
                        : "border border-dusty-blue/35 text-dusty-blue hover:bg-dusty-blue/10"
                    }`}
                  >
                    Contribute to this fund
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </section>

      <AnimatePresence>
        {selectedFund && (
          <>
            <motion.button
              type="button"
              aria-label="Close payment panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFund(null)}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-2xl rounded-t-3xl p-6 sm:bottom-6 sm:rounded-3xl ${
                isDark
                  ? "bg-tron-dark border border-tron-blue/30"
                  : "bg-white border border-sage/25 shadow-2xl"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className={`text-xs uppercase tracking-[0.32em] ${isDark ? "text-tron-accent" : "text-sage"}`}
                  >
                    Cash Registry
                  </p>
                  <h3
                    className={`mt-2 text-2xl font-bold ${isDark ? "font-tech text-tron-blue" : "font-serif text-dusty-blue"}`}
                  >
                    {selectedFund.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-warm-gray"}`}
                  >
                    Choose a payment method below.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFund(null)}
                  className={`rounded-full p-2 transition ${isDark ? "text-tron-blue hover:bg-tron-blue/10" : "text-dusty-blue hover:bg-dusty-blue/10"}`}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <a
                  href={PAYMENT_LINKS.paypal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isDark
                      ? "bg-tron-blue/15 text-tron-blue hover:bg-tron-blue/25"
                      : "bg-dusty-blue text-white hover:bg-dusty-blue/90"
                  }`}
                >
                  PayPal <ExternalLink size={14} />
                </a>
                <a
                  href={PAYMENT_LINKS.venmo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isDark
                      ? "bg-tron-blue/15 text-tron-blue hover:bg-tron-blue/25"
                      : "bg-dusty-blue text-white hover:bg-dusty-blue/90"
                  }`}
                >
                  Venmo <ExternalLink size={14} />
                </a>
                <div
                  className={`inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold ${
                    isDark
                      ? "bg-tron-grid text-gray-300 border border-tron-blue/20"
                      : "bg-sage/10 text-dusty-blue border border-sage/30"
                  }`}
                >
                  Cash / Check at Venue
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Note */}
      <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
        <div
          className={`p-8 rounded-2xl ${
            isDark
              ? "bg-tron-grid/50 border border-tron-blue/10"
              : "bg-cream/50 border border-sage/20"
          }`}
        >
          <p
            className={`text-sm italic leading-relaxed ${isDark ? "text-gray-400" : "text-warm-gray"}`}
          >
            "We truly mean it when we say your presence is enough. If you would
            like to give, a cash contribution toward our home or honeymoon is
            deeply appreciated."
          </p>
          <p
            className={`mt-4 font-semibold text-sm ${isDark ? "text-tron-blue font-tech" : "text-dusty-blue font-serif"}`}
          >
            — Angel & Seun
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
