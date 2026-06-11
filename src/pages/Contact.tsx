import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import PageTransition from "../components/PageTransition";
import { weddingDetails } from "../data/weddingDetails";

const faqs = [
  {
    q: "Can I bring a plus one?",
    a: "Your invitation will specify the number of guests in your party. If you have questions, please reach out to us directly.",
  },
  {
    q: "Is there parking at the venue?",
    a: `${weddingDetails.venue.name} has guest parking available on site. We will share any final parking or arrival notes closer to the wedding date.`,
  },
  {
    q: "Are children welcome?",
    a: "While we love your little ones, our ceremony and reception will be an adults-only celebration. We hope this gives you a wonderful excuse for a night out!",
  },
  {
    q: "What if I have dietary restrictions?",
    a: "Please note any dietary restrictions in your RSVP. Our caterers are experienced with all dietary needs including vegan, gluten-free, and allergy accommodations.",
  },
  {
    q: "When should I RSVP by?",
    a: "Please RSVP by August 1, 2026 so we can finalize headcounts with our venue and caterers.",
  },
  {
    q: "Is there a hotel room block?",
    a: "Lodging recommendations and any room block details are coming soon. Check the Venues page for the latest guest stay guidance.",
  },
  {
    q: "Will there be transportation between the hotel and venue?",
    a: "Transportation details are still being finalized. If shuttle service is offered, departure times and pickup locations will be shared closer to the date.",
  },
];

function FAQItem({ q, a, isDark }: { q: string; a: string; isDark: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b ${
        isDark ? "border-tron-blue/10" : "border-sage/20"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between py-4 text-left text-sm font-medium transition-colors cursor-pointer ${
          isDark
            ? "text-gray-200 hover:text-tron-blue"
            : "text-dusty-blue hover:text-dusty-blue/80"
        }`}
      >
        {q}
        <ChevronDown
          size={16}
          className={`flex-shrink-0 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <p
          className={`pb-4 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-warm-gray"}`}
        >
          {a}
        </p>
      </motion.div>
    </div>
  );
}

export default function Contact() {
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
          Contact Us
        </motion.h1>
        <p
          className={`text-lg max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-warm-gray"}`}
        >
          Questions? We're here to help make your experience seamless.
        </p>
      </section>

      {/* Contact Cards */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="grid sm:grid-cols-3 gap-4">
          <a
            href="mailto:angel.seun.wedding@example.com"
            className={`p-6 rounded-xl text-center transition-all ${
              isDark
                ? "bg-tron-grid border border-tron-blue/10 hover:border-tron-blue/30"
                : "bg-white/80 border border-sage/20 shadow-md hover:shadow-lg"
            }`}
          >
            <Mail
              size={24}
              className={`mx-auto mb-3 ${isDark ? "text-tron-blue" : "text-dusty-blue"}`}
            />
            <h3
              className={`font-semibold text-sm ${isDark ? "text-gray-200" : "text-dusty-blue"}`}
            >
              Email
            </h3>
            <p
              className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-warm-gray"}`}
            >
              angel.seun@example.com
            </p>
          </a>

          <a
            href="tel:+15551234567"
            className={`p-6 rounded-xl text-center transition-all ${
              isDark
                ? "bg-tron-grid border border-tron-blue/10 hover:border-tron-blue/30"
                : "bg-white/80 border border-sage/20 shadow-md hover:shadow-lg"
            }`}
          >
            <Phone
              size={24}
              className={`mx-auto mb-3 ${isDark ? "text-tron-blue" : "text-dusty-blue"}`}
            />
            <h3
              className={`font-semibold text-sm ${isDark ? "text-gray-200" : "text-dusty-blue"}`}
            >
              Phone
            </h3>
            <p
              className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-warm-gray"}`}
            >
              (555) 123-4567
            </p>
          </a>

          <a
            href="sms:+15551234567"
            className={`p-6 rounded-xl text-center transition-all ${
              isDark
                ? "bg-tron-grid border border-tron-blue/10 hover:border-tron-blue/30"
                : "bg-white/80 border border-sage/20 shadow-md hover:shadow-lg"
            }`}
          >
            <MessageCircle
              size={24}
              className={`mx-auto mb-3 ${isDark ? "text-tron-blue" : "text-dusty-blue"}`}
            />
            <h3
              className={`font-semibold text-sm ${isDark ? "text-gray-200" : "text-dusty-blue"}`}
            >
              Text
            </h3>
            <p
              className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-warm-gray"}`}
            >
              (555) 123-4567
            </p>
          </a>
        </div>
      </section>

      {/* Wedding Coordinator */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div
          className={`p-6 rounded-xl ${
            isDark
              ? "bg-tron-grid/50 border border-tron-blue/5"
              : "bg-cream/50 border border-sage/10"
          }`}
        >
          <h3
            className={`font-semibold mb-2 ${isDark ? "text-gray-200" : "text-dusty-blue"}`}
          >
            Wedding Coordinator
          </h3>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-warm-gray"}`}
          >
            For logistics, vendor questions, or day-of coordination:
          </p>
          <p
            className={`text-sm mt-2 font-medium ${isDark ? "text-tron-blue" : "text-dusty-blue"}`}
          >
            Maria Santos — Elegant Events Co.
          </p>
          <p
            className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-warm-gray"}`}
          >
            maria@elegantevents.example.com · (555) 987-6543
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <h2
          className={`text-2xl font-semibold mb-6 ${
            isDark ? "font-tech text-tron-blue" : "font-serif text-dusty-blue"
          }`}
        >
          Frequently Asked Questions
        </h2>
        <div
          className={`rounded-2xl overflow-hidden ${
            isDark
              ? "bg-tron-grid border border-tron-blue/10"
              : "bg-white/80 border border-sage/20 shadow-lg"
          }`}
        >
          <div className="px-6">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
