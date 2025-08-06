"use client";

import { motion } from "framer-motion";
import Separator from "./Separator";

interface HeaderProps {
  badge?: string;
  title?: string;
  highlightedTitle?: string;
  subtitle?: string;
}

export default function Header({
  badge = "Ferrati",
  title,
  highlightedTitle,
  subtitle,
}: HeaderProps) {
  return (
    <motion.div
      className="text-center my-16 mx-2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
    >
      <motion.div
        className="inline-block mb-4"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <span className="px-4 py-2 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full text-orange-600 font-semibold text-sm uppercase tracking-wider border border-orange-400/30">
          {badge}
        </span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {title}{" "}
        <motion.span
          className="bg-orange-500 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {highlightedTitle}
        </motion.span>
      </motion.h2>
      <Separator bg="accent" />
      <motion.p
        className="text-lg md:text-2xl text-gray-600  mx-auto leading-relaxed px-[10%]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}
