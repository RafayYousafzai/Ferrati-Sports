"use client";

import { motion } from "framer-motion";

export default function JoinOurCommunity() {
  return (
    <motion.div
      className="text-center mt-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <motion.div
        className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-lg px-8 py-4 rounded-2xl border border-white/20 shadow-2xl"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex -space-x-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 border-[3px] border-white/50"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <div className="text-left">
          <div className="text-black font-bold text-lg">Join Our Community</div>
          <div className="text-gray-600 text-sm">
            Growing stronger every day
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
