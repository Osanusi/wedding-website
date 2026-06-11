import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  ExternalLink,
  Building2,
  Hotel,
  Bed,
  Landmark,
  Camera,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import NetflixRow from "../components/NetflixRow";
import NetflixCard from "../components/NetflixCard";
import { weddingDetails } from "../data/weddingDetails";

const venueHighlights = [
  {
    title: "Private Estate Setting",
    subtitle: "55 acres in Northern Virginia",
    icon: Building2,
    iconVariant: "sage",
  },
  {
    title: "Indoor & Outdoor Flow",
    subtitle: "Ceremony, cocktail hour, and reception spaces",
    icon: Landmark,
    iconVariant: "blue",
  },
  {
    title: "Picture-Perfect Backdrop",
    subtitle: "Rolling views, gardens, and manor architecture",
    icon: Camera,
    iconVariant: "cream",
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
    title: "Travel Notes",
    subtitle: "More details to come",
    description:
      "We will share transportation, parking, and room block details as plans are finalized.",
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

      <NetflixRow title="Beacon Hill Manor Highlights">
        {venueHighlights.map((highlight) => (
          <NetflixCard
            key={highlight.title}
            title={highlight.title}
            subtitle={highlight.subtitle}
            icon={highlight.icon}
            iconVariant={highlight.iconVariant}
          />
        ))}
      </NetflixRow>

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
