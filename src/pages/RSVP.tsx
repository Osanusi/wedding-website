import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, PartyPopper } from "lucide-react";
import PageTransition from "../components/PageTransition";

interface FormData {
  name: string;
  email: string;
  attending: "yes" | "no" | "";
  partySize: number;
  mealPreference: string;
  dietaryRestrictions: string;
  songRequest: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  attending: "",
  partySize: 1,
  mealPreference: "",
  dietaryRestrictions: "",
  songRequest: "",
};

const steps = ["Your Info", "Attendance", "Preferences", "Extras", "Confirm"];

export default function RSVP() {
  const { isDark } = useOutletContext<{ isDark: boolean }>();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const update = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Enter a valid email";
    }
    if (step === 1) {
      if (!formData.attending) newErrors.attending = "Please select one";
    }
    if (step === 2 && formData.attending === "yes") {
      if (!formData.mealPreference)
        newErrors.mealPreference = "Please select a meal";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    // Skip preferences step if not attending
    if (step === 1 && formData.attending === "no") {
      setStep(4);
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prev = () => {
    if (step === 4 && formData.attending === "no") {
      setStep(1);
      return;
    }
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    // TODO: Replace with real API call to AWS API Gateway
    setSubmitted(true);
  };

  const inputClass = `w-full px-4 py-3 rounded-lg text-sm outline-none transition-all ${
    isDark
      ? "bg-tron-dark border border-tron-blue/20 text-tron-blue placeholder-gray-600 focus:border-tron-blue focus:shadow-[0_0_10px_rgba(102,252,241,0.2)] font-tech"
      : "bg-white border border-sage/30 text-dusty-blue placeholder-warm-gray/50 focus:border-dusty-blue focus:shadow-md"
  }`;

  const labelClass = `block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-dusty-blue"}`;

  const errorClass = "text-red-400 text-xs mt-1";

  const radioClass = (selected: boolean) =>
    `flex-1 p-4 rounded-xl cursor-pointer text-center font-semibold text-sm transition-all border ${
      selected
        ? isDark
          ? "bg-tron-blue/10 border-tron-blue text-tron-blue shadow-[0_0_10px_rgba(102,252,241,0.2)]"
          : "bg-sage/20 border-dusty-blue text-dusty-blue shadow-md"
        : isDark
          ? "bg-tron-grid border-tron-blue/10 text-gray-400 hover:border-tron-blue/30"
          : "bg-white/80 border-sage/20 text-warm-gray hover:border-sage/40"
    }`;

  if (submitted) {
    return (
      <PageTransition>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div
              className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                isDark ? "bg-tron-blue/10" : "bg-sage/20"
              }`}
            >
              <PartyPopper
                size={36}
                className={isDark ? "text-tron-blue" : "text-dusty-blue"}
              />
            </div>
            <h2
              className={`text-3xl font-bold mb-4 ${
                isDark
                  ? "font-tech text-tron-blue"
                  : "font-serif text-dusty-blue"
              }`}
            >
              {formData.attending === "yes"
                ? "See You There!"
                : "We'll Miss You!"}
            </h2>
            <p
              className={`text-sm ${isDark ? "text-gray-400" : "text-warm-gray"}`}
            >
              {formData.attending === "yes"
                ? `Thank you, ${formData.name}! Your RSVP for ${formData.partySize} has been received. We can't wait to celebrate with you.`
                : `Thank you for letting us know, ${formData.name}. You'll be in our hearts on the big day.`}
            </p>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-16 pb-4 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl sm:text-6xl font-bold mb-4 ${
            isDark
              ? "font-tech text-tron-blue animate-glow-pulse"
              : "font-serif text-dusty-blue"
          }`}
        >
          RSVP
        </motion.h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-warm-gray"}`}>
          Let us know if you can make it!
        </p>
      </section>

      {/* Step Indicator */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step
                    ? isDark
                      ? "bg-tron-blue text-tron-black"
                      : "bg-dusty-blue text-white"
                    : i === step
                      ? isDark
                        ? "bg-tron-blue/20 text-tron-blue border-2 border-tron-blue"
                        : "bg-sage/20 text-dusty-blue border-2 border-dusty-blue"
                      : isDark
                        ? "bg-tron-grid text-gray-600"
                        : "bg-sage/10 text-warm-gray/50"
                }`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-px w-6 sm:w-12 mx-1 ${
                    i < step
                      ? isDark
                        ? "bg-tron-blue"
                        : "bg-dusty-blue"
                      : isDark
                        ? "bg-tron-blue/10"
                        : "bg-sage/20"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-lg mx-auto px-4 pb-20">
        <div
          className={`p-6 sm:p-8 rounded-2xl ${
            isDark
              ? "bg-tron-grid border border-tron-blue/10"
              : "bg-white/80 border border-sage/20 shadow-lg"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Step 0: Your Info */}
              {step === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Jane Doe"
                      className={inputClass}
                    />
                    {errors.name && <p className={errorClass}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="jane@example.com"
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className={errorClass}>{errors.email}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 1: Attendance */}
              {step === 1 && (
                <div className="space-y-4">
                  <label className={labelClass}>Will you be attending?</label>
                  <div className="flex gap-4">
                    <div
                      onClick={() => update("attending", "yes")}
                      className={radioClass(formData.attending === "yes")}
                    >
                      Joyfully Accept
                    </div>
                    <div
                      onClick={() => update("attending", "no")}
                      className={radioClass(formData.attending === "no")}
                    >
                      Regretfully Decline
                    </div>
                  </div>
                  {errors.attending && (
                    <p className={errorClass}>{errors.attending}</p>
                  )}

                  {formData.attending === "yes" && (
                    <div>
                      <label className={labelClass}>
                        Party Size (including you)
                      </label>
                      <select
                        value={formData.partySize}
                        onChange={(e) =>
                          update("partySize", Number(e.target.value))
                        }
                        className={inputClass}
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Meal Preferences */}
              {step === 2 && (
                <div className="space-y-4">
                  <label className={labelClass}>Meal Preference</label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Beef Tenderloin",
                      "Grilled Salmon",
                      "Mushroom Risotto (V)",
                      "Kids Meal",
                    ].map((meal) => (
                      <div
                        key={meal}
                        onClick={() => update("mealPreference", meal)}
                        className={radioClass(formData.mealPreference === meal)}
                      >
                        {meal}
                      </div>
                    ))}
                  </div>
                  {errors.mealPreference && (
                    <p className={errorClass}>{errors.mealPreference}</p>
                  )}

                  <div>
                    <label className={labelClass}>Dietary Restrictions</label>
                    <input
                      type="text"
                      value={formData.dietaryRestrictions}
                      onChange={(e) =>
                        update("dietaryRestrictions", e.target.value)
                      }
                      placeholder="Allergies, vegetarian, etc."
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Extras */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Song Request</label>
                    <input
                      type="text"
                      value={formData.songRequest}
                      onChange={(e) => update("songRequest", e.target.value)}
                      placeholder="What song gets you on the dance floor?"
                      className={inputClass}
                    />
                    <p
                      className={`text-xs mt-2 ${isDark ? "text-gray-600" : "text-warm-gray/60"}`}
                    >
                      Help us build the ultimate playlist!
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Confirm */}
              {step === 4 && (
                <div className="space-y-3">
                  <h3
                    className={`text-lg font-semibold mb-4 ${isDark ? "text-tron-blue font-tech" : "text-dusty-blue font-serif"}`}
                  >
                    Confirm Your RSVP
                  </h3>
                  <div
                    className={`text-sm space-y-2 ${isDark ? "text-gray-300" : "text-warm-gray"}`}
                  >
                    <p>
                      <strong>Name:</strong> {formData.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {formData.email}
                    </p>
                    <p>
                      <strong>Attending:</strong>{" "}
                      {formData.attending === "yes" ? "Yes" : "No"}
                    </p>
                    {formData.attending === "yes" && (
                      <>
                        <p>
                          <strong>Party Size:</strong> {formData.partySize}
                        </p>
                        <p>
                          <strong>Meal:</strong>{" "}
                          {formData.mealPreference || "Not selected"}
                        </p>
                        {formData.dietaryRestrictions && (
                          <p>
                            <strong>Dietary:</strong>{" "}
                            {formData.dietaryRestrictions}
                          </p>
                        )}
                        {formData.songRequest && (
                          <p>
                            <strong>Song:</strong> {formData.songRequest}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prev}
              disabled={step === 0}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                isDark
                  ? "text-gray-400 hover:text-tron-blue"
                  : "text-warm-gray hover:text-dusty-blue"
              }`}
            >
              <ChevronLeft size={16} /> Back
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={next}
                className={`flex items-center gap-1 px-6 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  isDark
                    ? "bg-tron-blue text-tron-black hover:shadow-[0_0_15px_rgba(102,252,241,0.3)]"
                    : "bg-dusty-blue text-white hover:bg-dusty-blue/90"
                }`}
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  isDark
                    ? "bg-tron-blue text-tron-black hover:shadow-[0_0_20px_rgba(102,252,241,0.4)]"
                    : "bg-dusty-blue text-white hover:bg-dusty-blue/90 shadow-lg"
                }`}
              >
                Submit RSVP
              </button>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
