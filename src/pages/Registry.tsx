import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Heart,
  Plane,
  Gift,
  UtensilsCrossed,
  Coffee,
  Bed,
  Waves,
  Landmark,
  Wine,
  Sunrise,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import NetflixRow from "../components/NetflixRow";
import NetflixCard from "../components/NetflixCard";

const categories = [
  {
    icon: Gift,
    title: "Kitchen & Dining",
    description:
      "Help us build our dream kitchen — from a Le Creuset dutch oven to that fancy espresso machine we've been eyeing.",
    link: "#",
    store: "Crate & Barrel",
  },
  {
    icon: Heart,
    title: "Home & Decor",
    description:
      "We just bought our first house! Help us turn it into a home with cozy linens, art, and everything in between.",
    link: "#",
    store: "West Elm",
  },
  {
    icon: Plane,
    title: "Honeymoon Fund",
    description:
      "We're dreaming of two weeks in Bali — temple visits, rice terraces, surf lessons, and the most incredible sunsets. Your contribution fuels the adventure.",
    link: "#",
    store: "Honeyfund",
  },
];

const registryCards = [
  {
    title: "Cookware Set",
    subtitle: "Le Creuset — $350",
    icon: UtensilsCrossed,
    iconVariant: "sage",
  },
  {
    title: "Espresso Machine",
    subtitle: "Breville — $700",
    icon: Coffee,
    iconVariant: "blue",
  },
  {
    title: "Linen Duvet",
    subtitle: "Brooklinen — $250",
    icon: Bed,
    iconVariant: "cream",
  },
  {
    title: "Bali Surf Lesson",
    subtitle: "Honeymoon — $100",
    icon: Waves,
    iconVariant: "blush",
  },
  {
    title: "Dinner Set for 8",
    subtitle: "Heath Ceramics — $480",
    icon: UtensilsCrossed,
    iconVariant: "cream",
  },
  {
    title: "Temple Tour",
    subtitle: "Honeymoon — $75",
    icon: Landmark,
    iconVariant: "sage",
  },
  {
    title: "Wine Glasses",
    subtitle: "Riedel — $120",
    icon: Wine,
    iconVariant: "blue",
  },
  {
    title: "Sunrise Hot Air Balloon",
    subtitle: "Honeymoon — $200",
    icon: Sunrise,
    iconVariant: "blush",
  },
];

export default function Registry() {
  const { isDark } = useOutletContext<{ isDark: boolean }>();

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
          Your presence is the greatest gift — but if you'd like to give us
          something to unwrap, here are our favorites.
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
                  className={`text-xs mt-1 ${isDark ? "text-tron-accent" : "text-sage"}`}
                >
                  via {cat.store}
                </p>
                <p
                  className={`text-sm mt-3 leading-relaxed ${isDark ? "text-gray-400" : "text-warm-gray"}`}
                >
                  {cat.description}
                </p>
                <a
                  href={cat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 mt-4 text-sm font-medium transition-colors ${
                    isDark
                      ? "text-tron-blue hover:text-tron-blue/80"
                      : "text-dusty-blue hover:text-dusty-blue/80"
                  }`}
                >
                  View Registry <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Gift Ideas Carousel */}
      <NetflixRow title="Gift Ideas">
        {registryCards.map((card) => (
          <NetflixCard
            key={card.title}
            title={card.title}
            subtitle={card.subtitle}
            icon={card.icon}
            iconVariant={card.iconVariant}
          />
        ))}
      </NetflixRow>

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
            "We truly mean it when we say your presence at our wedding is the
            greatest gift. We are so grateful to have each and every one of you
            in our lives. If you do wish to give a gift, any contribution to our
            registries or honeymoon fund is deeply appreciated."
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
