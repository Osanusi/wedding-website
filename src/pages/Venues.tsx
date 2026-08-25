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
import { weddingDetails } from "../data/weddingDetails";

const venueHighlights = [
  {
    title: "Private Estate Setting",
    description: "55 acres of rolling countryside in Loudoun County, Northern Virginia.",
    icon: Building2,
  },
  {
    title: "Indoor & Outdoor Flow",
    description: "Ceremony, cocktail hour, and reception spaces across the manor grounds.",
    icon: Landmark,
  },
  {
    title: "Scenic Views",
    description: "Rolling hills, gardens, and manor architecture as your backdrop all day.",
    icon: MapPin,
  },
];

const venuePhotos = [
  {
    src: weddingDetails.images.venueHero,
    alt: `${weddingDetails.venue.name} estate grounds`,
  },
  {
    src: weddingDetails.images.manorExterior,
    alt: `${weddingDetails.venue.name} manor exterior`,
  },
  {
    src: weddingDetails.images.aerialView,
    alt: `Aerial view of ${weddingDetails.venue.name}`,
  },
  ...weddingDetails.images.gallery.slice(0, 3).map((src, index) => ({
    src,
    alt: `${weddingDetails.venue.name} gallery photo ${index + 1}`,
  })),
];

const hotels = [
  {
    title: "Lodging Recommendations",
    subtitle: "Guest stay details coming soon",
    description:
      "We are gathering nearby hotel and lodging options for guests traveling to Northern Virginia.",
    bookUrl: "#",
    icon: Building2,
    iconVariant: "sage",
  },
  {
    title: "Leesburg Area Stays",
    subtitle: "Convenient to Paeonian Springs",
    description:
      "Leesburg and the surrounding Loudoun County area offer hotels, inns, and weekend rentals.",
    bookUrl: "#",
    icon: Hotel,
    iconVariant: "blue",
  },
  {
    title: "Weekend Rentals",
    subtitle: "For families and groups",
    description:
      "Rental homes can be a good fit for guests staying together for the wedding weekend.",
    bookUrl: "#",
    icon: Bed,
    iconVariant: "cream",
  },
  {
    title: "Shuttle & Parking",
    subtitle: "Church to reception transport",
    description:
      "A shuttle will run from Immaculate Conception Church to Beacon Hill Manor for guests who need transportation. Street parking is available around the church (2-hour limit) and 'wedding guest' No Parking signs will be posted in front of the church during the ceremony. For longer parking, use the Colonial Parking garage at 7th & O Streets NW — a short walk from the church.",
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
          Beacon Hill Manor, guest lodging, and travel notes.
        </p>
      </section>

      {/* Venue Details */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`overflow-hidden rounded-2xl ${
            isDark
              ? "bg-tron-grid border border-tron-blue/10 hover:border-tron-blue/30"
              : "bg-white/80 border border-sage/20 shadow-lg hover:shadow-xl"
          } transition-all duration-300`}
        >
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[300px]">
              <img
                src={weddingDetails.images.venueHero}
                alt={`${weddingDetails.venue.name} estate grounds`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                <p className="text-xs uppercase tracking-[0.32em] text-cream/80">
                  Ceremony & Reception
                </p>
                <h3 className="mt-2 font-serif text-3xl font-bold">
                  {weddingDetails.venue.name}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <span
                className={`text-xs uppercase tracking-widest ${
                  isDark ? "text-tron-accent font-tech" : "text-sage"
                }`}
              >
                {weddingDetails.venue.subtitle}
              </span>
              <h3
                className={`text-2xl font-bold mt-1 ${
                  isDark
                    ? "text-tron-blue font-tech"
                    : "text-dusty-blue font-serif"
                }`}
              >
                {weddingDetails.venue.region}
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-warm-gray"}`}
              >
                {weddingDetails.venue.description} Beacon Hill Manor blends
                elegant estate spaces, rustic charm, and scenic views for a
                celebration tucked into Loudoun County.
              </p>
              <div
                className={`flex items-start gap-2 mt-4 text-sm ${isDark ? "text-gray-500" : "text-warm-gray/70"}`}
              >
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <span>
                  {weddingDetails.venue.addressLine1}
                  <br />
                  {weddingDetails.venue.addressLine2}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={weddingDetails.venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isDark
                      ? "bg-tron-blue/10 text-tron-blue hover:bg-tron-blue/20 border border-tron-blue/20"
                      : "bg-sage/10 text-dusty-blue hover:bg-sage/20 border border-sage/20"
                  }`}
                >
                  <ExternalLink size={14} /> Directions
                </a>
                <a
                  href={weddingDetails.venue.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isDark
                      ? "bg-tron-grid text-gray-200 hover:text-tron-blue border border-tron-blue/20"
                      : "bg-white/70 text-dusty-blue hover:bg-white border border-gilded-gold/30"
                  }`}
                >
                  <ExternalLink size={14} /> Venue Website
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Venue highlights — 3 cards */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {venueHighlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`rounded-2xl border p-5 ${
                  isDark
                    ? "border-tron-blue/15 bg-tron-grid/60"
                    : "border-sage/20 bg-white/80 shadow-md"
                }`}
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                  isDark ? "bg-tron-blue/15 text-tron-blue" : "bg-sage/20 text-dusty-blue"
                }`}>
                  <Icon size={18} />
                </div>
                <h4 className={`mt-4 font-semibold ${
                  isDark ? "text-tron-blue font-tech" : "text-dusty-blue font-serif"
                }`}>{h.title}</h4>
                <p className={`mt-2 text-sm leading-relaxed ${
                  isDark ? "text-gray-400" : "text-warm-gray"
                }`}>{h.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {venuePhotos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className={`overflow-hidden rounded-xl border ${
                isDark
                  ? "border-tron-blue/10 bg-tron-grid"
                  : "border-sage/20 bg-white/70 shadow-md"
              } ${index === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full min-h-40 w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Where to Stay — editorial cards, no carousel */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className={`text-2xl font-semibold mb-6 ${
            isDark ? "font-tech text-tron-blue" : "font-serif text-dusty-blue"
          }`}
        >
          Where to Stay
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {hotels.map((hotel, i) => {
            const Icon = hotel.icon;
            return (
              <motion.div
                key={hotel.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`rounded-2xl border p-5 ${
                  isDark
                    ? "border-tron-blue/15 bg-tron-grid/55"
                    : "border-sage/15 bg-white/75 shadow-sm"
                }`}
              >
                <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                  isDark ? "bg-tron-blue/15 text-tron-blue" : "bg-sage/20 text-dusty-blue"
                }`}>
                  <Icon size={16} />
                </div>
                <h4 className={`mt-3 font-semibold ${
                  isDark ? "text-gray-200" : "text-dusty-blue"
                }`}>{hotel.title}</h4>
                <p className={`text-xs mt-1 ${
                  isDark ? "text-tron-accent" : "text-sage"
                }`}>{hotel.subtitle}</p>
                <p className={`text-sm mt-2 leading-relaxed ${
                  isDark ? "text-gray-500" : "text-warm-gray"
                }`}>{hotel.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}
