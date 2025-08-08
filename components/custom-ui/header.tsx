"use client";

import { motion } from "framer-motion";

import Separator from "../separator";

interface HeaderProps {
  badge?: string;
  title?: string;
  highlightedTitle?: string;
  subtitle?: string;
  theme?: "light" | "dark";
  leftAlign?: boolean;
}

export default function Header({
  theme = "light",
  badge = "Ferrati",
  title,
  highlightedTitle,
  subtitle,
  leftAlign = false,
}: HeaderProps) {
  // Define color classes based on theme
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const subtitleColor = theme === "dark" ? "text-gray-100" : "text-gray-600";
  const badgeBg =
    theme === "dark"
      ? "bg-gradient-to-r from-orange-400 to-yellow-400 border-orange-400"
      : "bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-orange-500/30";
  const badgeText = theme === "dark" ? "text-white" : "text-orange-600";

  return (
    <motion.div
      className={`
        my-16 mx-2 ${textColor}
        ${leftAlign ? "text-left ml-[5%] md:ml-[2%]" : "text-center"}
      `}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className={leftAlign ? "block" : "inline-block mb-4"}
        initial={{ scale: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        whileInView={{ scale: 1 }}
      >
        <span
          className={`px-4 py-2 ${badgeBg} rounded-full ${badgeText} font-semibold text-sm uppercase tracking-wider border`}
        >
          {badge}
        </span>
      </motion.div>

      <motion.h2
        className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${textColor}`}
        initial={{ opacity: 0, y: 30 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {title}{" "}
        <motion.span
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          className={`bg-clip-text ${theme === "dark" ? "text-white" : "text-orange-500"}`}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {highlightedTitle}
        </motion.span>
      </motion.h2>

      <Separator bg={theme === "dark" ? "white" : "accent"} />

      <motion.p
        className={`
          text-lg md:text-2xl leading-relaxed ${subtitleColor}
          ${leftAlign ? "pr-[10%]" : "mx-auto px-[10%]"}
        `}
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}
