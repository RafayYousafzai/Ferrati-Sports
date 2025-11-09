"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
        {/* Footer Quote */}
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mt-16 text-center p-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
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
