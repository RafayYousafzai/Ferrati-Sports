"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Award, Users } from "lucide-react";

const countries = [
  { code: "US", name: "USA" },
  { code: "GB", name: "UK" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "AU", name: "Australia" },
  { code: "CA", name: "Canada" },
];

export default function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 ">
      <div className="container mx-auto px-4 max-w-7xl text-balance">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-full text-orange-600 font-semibold text-sm uppercase tracking-wider">
            OUR PHILOSOPHY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-8 mb-6">
            We Believe Manufacturing Should{" "}
            <span className="text-orange-600">Empower, Not Frustrate.</span>
          </h2>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Your creativity should never be limited by MOQs, missed deadlines,
            or unclear communication.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg"
          >
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-orange-600 mb-2">200+</div>
            <p className="text-gray-700 font-semibold">Brands Worldwide</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg"
          >
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-orange-600 mb-2">15+</div>
            <p className="text-gray-700 font-semibold">Countries Served</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg"
          >
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
            <p className="text-gray-700 font-semibold">Client Satisfaction</p>
          </motion.div>
        </div>

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Trusted by brands in:
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {countries.map((country, index) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 bg-white border-2 border-gray-200 rounded-lg px-6 py-4 hover:border-orange-500 hover:shadow-lg transition-all"
              >
                <div className="text-4xl">{getFlagEmoji(country.code)}</div>
                <span className="font-semibold text-gray-700">
                  {country.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center p-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg"
        >
          <p className="text-3xl md:text-4xl font-bold text-white italic">
            &quot;We believe every brand deserves manufacturing that inspires
            confidence.&quot;
          </p>
          <p className="text-xl text-orange-100 mt-4 font-semibold">
            Ferrati Sports — From Sketch to Store™
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Helper function to get flag emoji from country code
function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
