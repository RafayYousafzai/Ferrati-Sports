"use client";

import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import React, { useRef } from "react";

export default function CounterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      {" "}
      {/* Stats Bar */}
      <motion.div
        ref={ref}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="mt-0 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-lg"
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-600 mb-2">200+</div>
          <div className="text-sm text-gray-700 font-medium">Brands Served</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-600 mb-2">30</div>
          <div className="text-sm text-gray-700 font-medium">Day Delivery</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-600 mb-2">50</div>
          <div className="text-sm text-gray-700 font-medium">
            Unit Min Order
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
          <div className="text-sm text-gray-700 font-medium">
            Quality Assured
          </div>
        </div>
      </motion.div>
    </div>
  );
}
