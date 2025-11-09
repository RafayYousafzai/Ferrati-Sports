"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Quote } from "lucide-react";
import { Button } from "@heroui/button";
import Link from "next/link";

const benefits = [
  "On-time delivery",
  "Consistent quality",
  "Reliable partnership",
  "Transparent communication",
  "Flexible MOQs",
  "Expert guidance",
];

export default function SuccessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-full text-orange-600 font-semibold text-sm uppercase tracking-wider">
            THE SUCCESS
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-8 mb-6">
            Imagine Launching Your Next Collection{" "}
            <span className="text-orange-600">Without Stress.</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            With Ferrati Sports, you get manufacturing that works like
            clockwork:
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Benefits List */}
          <motion.div
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-800">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-2xl font-bold text-gray-900 mb-4">
                That&apos;s the Ferrati Sports experience.
              </p>
              <p className="text-lg text-gray-600">
                No more delays. No more guesswork.{" "}
                <span className="font-semibold text-gray-800">
                  Just your dream collection, built exactly as you imagined.
                </span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Testimonial */}
          <motion.div
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl relative">
              {/* Quote Icon */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-8 h-8 text-white" />
              </div>

              {/* Testimonial Content */}
              <div className="relative z-10">
                <p className="text-xl md:text-2xl text-gray-700 italic mb-6 leading-relaxed">
                  &quot;Ferrati Sports gave us speed, reliability, and top-notch
                  quality — every single order.&quot;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    SJ
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Sarah J.</p>
                    <p className="text-gray-600">USA Brand Owner</p>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-100 rounded-full -z-10" />
            </div>

            {/* Additional Visual Element */}
            <div className="mt-8 p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white text-center shadow-lg">
              <p className="text-3xl font-bold mb-2">98%</p>
              <p className="text-orange-100">Client Satisfaction Rate</p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link href="/request-quote">
            <Button
              className="px-10 py-6 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
              radius="sm"
              size="lg"
            >
              📞 Get a Free Quote Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
