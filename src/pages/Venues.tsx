import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  ExternalLink,
  Building2,
  Hotel,
  Bed,
  Landmark,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import NetflixRow from "../components/NetflixRow";
import NetflixCard from "../components/NetflixCard";

const venues = [
  {
    title: "The Grandview Estate",
    subtitle: "Ceremony & Reception",
    address: "1234 Hilltop Drive, Napa Valley, CA",
    mapUrl: "https://maps.google.com",
    description:
      "A stunning hilltop estate overlooking the vineyard valley. Our ceremony will be in the garden pavilion, followed by dinner in the grand ballroom.",
  },
  {
    title: "Vineyard Terrace",
    subtitle: "Cocktail Hour",
    address: "1234 Hilltop Drive, Napa Valley, CA",
    mapUrl: "https://maps.google.com",
    description:
      "The open-air terrace with panoramic views of the Napa hills. Craft cocktails and passed hors d'oeuvres while the sun sets.",
  },
];

const hotels = [
  {
    title: "The Napa Grand Hotel",
    subtitle: "From $189/night — 5 min drive",
    description:
      "Our room block with a 15% discount. Use code ANGELSEUN2026 when booking.",
    bookUrl: "#",
    icon: Building2,
    iconVariant: "sage",
  },
  {
    title: "Vineyard Inn & Spa",
    subtitle: "From $149/night — 10 min drive",
    description:
      "Charming boutique hotel with a renowned spa. Perfect for a pre-wedding pamper day.",
    bookUrl: "#",
    icon: Hotel,
    iconVariant: "blue",
  },
  {
    title: "Hilltop Lodge",
    subtitle: "From $129/night — 8 min drive",
    description:
      "Cozy lodge-style accommodations surrounded by redwoods. Great for families.",
    bookUrl: "#",
    icon: Bed,
    iconVariant: "cream",
  },
  {
    title: "Downtown Napa Suites",
    subtitle: "From $169/night — 15 min drive",
    description:
      "Modern suites in the heart of Napa. Walking distance to restaurants and wine bars.",
    bookUrl: "#",
    icon: Landmark,
    iconVariant: "blush",
  },
];

export default function Venues() {
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
          Venues & Stay
        </motion.h1>
        <p
          className={`text-lg max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-warm-gray"}`}
        >
          Where the magic happens — and where to rest your head.
        </p>
      </section>

      {/* Venue Details */}
      <section className="max-w-4xl mx-auto px-4 pb-12 space-y-6">
        {venues.map((venue, index) => (
          <motion.div
            key={venue.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 sm:p-8 rounded-2xl ${
              isDark
                ? "bg-tron-grid border border-tron-blue/10 hover:border-tron-blue/30"
                : "bg-white/80 border border-sage/20 shadow-lg hover:shadow-xl"
            } transition-all duration-300`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <span
                  className={`text-xs uppercase tracking-widest ${
                    isDark ? "text-tron-accent font-tech" : "text-sage"
                  }`}
                >
                  {venue.subtitle}
                </span>
                <h3
                  className={`text-2xl font-bold mt-1 ${
                    isDark
                      ? "text-tron-blue font-tech"
                      : "text-dusty-blue font-serif"
                  }`}
                >
                  {venue.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed max-w-lg ${isDark ? "text-gray-400" : "text-warm-gray"}`}
                >
                  {venue.description}
                </p>
                <div
                  className={`flex items-center gap-1 mt-3 text-sm ${isDark ? "text-gray-500" : "text-warm-gray/70"}`}
                >
                  <MapPin size={14} />
                  {venue.address}
                </div>
              </div>
              <a
                href={venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isDark
                    ? "bg-tron-blue/10 text-tron-blue hover:bg-tron-blue/20 border border-tron-blue/20"
                    : "bg-sage/10 text-dusty-blue hover:bg-sage/20 border border-sage/20"
                }`}
              >
                <ExternalLink size={14} /> Directions
              </a>
            </div>

            {/* Map placeholder */}
            <div
              className={`mt-6 h-48 rounded-xl flex items-center justify-center ${
                isDark
                  ? "bg-tron-dark border border-tron-blue/10"
                  : "bg-sage/10 border border-sage/20"
              }`}
            >
              <span
                className={`text-sm ${isDark ? "text-gray-600" : "text-warm-gray/50"}`}
              >
                Map embed placeholder
              </span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Accommodations Carousel */}
      <NetflixRow title="Where to Stay">
        {hotels.map((hotel) => (
          <NetflixCard
            key={hotel.title}
            title={hotel.title}
            subtitle={hotel.subtitle}
            icon={hotel.icon}
            iconVariant={hotel.iconVariant}
          />
        ))}
      </NetflixRow>

      {/* Accommodation Details */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 gap-4">
          {hotels.map((hotel) => (
            <div
              key={hotel.title}
              className={`p-5 rounded-xl ${
                isDark
                  ? "bg-tron-grid/50 border border-tron-blue/5"
                  : "bg-white/60 border border-sage/10"
              }`}
            >
              <h4
                className={`font-semibold ${isDark ? "text-gray-200" : "text-dusty-blue"}`}
              >
                {hotel.title}
              </h4>
              <p
                className={`text-xs mt-1 ${isDark ? "text-tron-accent" : "text-sage"}`}
              >
                {hotel.subtitle}
              </p>
              <p
                className={`text-sm mt-2 ${isDark ? "text-gray-500" : "text-warm-gray"}`}
              >
                {hotel.description}
              </p>
              <a
                href={hotel.bookUrl}
                className={`inline-block mt-3 text-sm font-medium ${
                  isDark
                    ? "text-tron-blue hover:text-tron-blue/80"
                    : "text-dusty-blue hover:text-dusty-blue/80"
                }`}
              >
                Book Now →
              </a>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
