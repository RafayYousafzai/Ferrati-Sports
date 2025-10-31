"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Clock, Gift } from "lucide-react";
import { Button } from "@heroui/button";
import Link from "next/link";

export default function UrgencySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-10 left-10 w-48 h-48 bg-white rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-semibold text-sm uppercase tracking-wider mb-8">
            <Clock className="w-4 h-4" />
            <span>Limited Time Offer</span>
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Fast-Start Bonus —{" "}
            <span className="text-yellow-300">Ends in 7 Days!</span>
          </h2>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 mb-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <motion.div
                key={unit}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg p-4 min-w-[80px] shadow-xl"
              >
                <div className="text-4xl font-bold text-orange-600">
                  {value}
                </div>
                <div className="text-sm text-gray-600 uppercase">{unit}</div>
              </motion.div>
            ))}
          </div>

          {/* Offer Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl p-8 mb-8 max-w-2xl mx-auto"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Confirm your first order this week and get:
                </h3>
                <p className="text-xl text-white/90">
                  <span className="font-bold text-yellow-300">
                    FREE Custom Labels & Tags
                  </span>{" "}
                  (worth $300)
                </p>
              </div>
            </div>
            <p className="text-white/80 text-lg">
              — because your brand deserves to look as good as it feels.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/request-quote">
              <Button
                size="lg"
                className="px-10 py-6 bg-yellow-400 hover:bg-yellow-300 text-orange-600 font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
                radius="sm"
              >
                🎁 Claim Your Free Branding Bonus
              </Button>
            </Link>
            <p className="text-white/70 mt-4 text-sm">
              * Offer valid for new orders placed within 7 days
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
