"use client";

import { type ReactNode, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Users, Trophy, Download, Star, TrendingUp, Award } from "lucide-react";

interface CounterItemProps {
  icon: ReactNode;
  value: number;
  label: string;
  suffix?: string;
  index: number;
}

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const display = useTransform(springValue, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight"
    >
      <motion.span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
        {display}
      </motion.span>
      <span className="text-yellow-300">{suffix}</span>
    </motion.div>
  );
}

function CounterItem({
  icon,
  value,
  label,
  suffix = "",
  index,
}: CounterItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.25, 0, 1],
      }}
      whileHover={{ scale: 1.05 }}
      className="text-center group"
    >
      <motion.div
        className="relative mb-6"
        whileHover={{ rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Floating background circle */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Main icon container */}
        <motion.div
          className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl shadow-2xl"
          whileHover={{
            scale: 1.1,
            rotate: 3,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="text-white text-3xl"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.div>

          {/* Animated ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          />
        </motion.div>
      </motion.div>

      <div className="relative">
        {/* Counter number */}
        <AnimatedCounter value={value} suffix={suffix} />

        {/* Label */}
        <motion.div
          className="text-neutral-300 font-semibold text-xl tracking-wide uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.5 }}
        >
          {label}
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          whileHover={{ scaleX: 1.2 }}
          transition={{ delay: index * 0.2 + 0.8, duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
}

// Floating particles component (unchanged, but included for context)
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            x: [-10, 10, -10],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function CounterSection() {
  const counters = [
    {
      icon: <Trophy />,
      value: 50,
      label: "Happy Clients",
      suffix: "+",
    },
    {
      icon: <Star />,
      value: 10,
      label: "Years of Working Experience",
      suffix: "%",
    },
    {
      icon: <TrendingUp />,
      value: 100,
      label: "Met 100% of Deadlines",
      suffix: "%",
    },
  ];

  return (
    <section className="relative h-auto py-24 bg-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-400/10 rounded-full blur-3xl"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Counters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {counters.map((counter, index) => (
            <CounterItem
              key={counter.label}
              icon={counter.icon}
              value={counter.value}
              label={counter.label}
              suffix={counter.suffix}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
