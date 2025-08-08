"use client";
import { type ReactNode, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Trophy, Star, TrendingUp } from "lucide-react";

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
    Math.round(current).toLocaleString(),
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
      <motion.span className="bg-white bg-clip-text text-transparent">
        {display}
      </motion.span>
      <span className="text-white">{suffix}</span>
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
      className="text-center group"
      initial={{ opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.25, 0, 1],
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.05 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="relative mb-6"
        transition={{ type: "spring", stiffness: 300 }}
        whileHover={{ rotate: 5 }}
      >
        {/* Floating background circle - simplified animation */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1], // Slightly less dramatic scale
            opacity: [0.3, 0.5, 0.3], // Slightly less dramatic opacity
          }}
          className="absolute inset-0  rounded-full"
          transition={{
            duration: 4, // Increased duration for smoother, less frequent change
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        {/* Main icon container */}
        <motion.div
          className="relative inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl"
          transition={{ type: "spring", stiffness: 300 }}
          whileHover={{
            scale: 1.1,
            rotate: 3,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
        >
          <motion.div
            className="text-orange-500 text-3xl"
            transition={{ type: "spring", stiffness: 400 }}
            whileHover={{ scale: 1.1 }}
          >
            {icon}
          </motion.div>
          {/* Animated ring - simplified animation */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1], // Slightly less dramatic scale
              opacity: [0.5, 0, 0.5],
            }}
            className="absolute inset-0 rounded-2xl border-2 border-white/30"
            transition={{
              duration: 3, // Increased duration
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          />
        </motion.div>
      </motion.div>
      <div className="relative">
        {/* Counter number */}
        <AnimatedCounter suffix={suffix} value={value} />
        {/* Label */}
        <motion.div
          className="text-white font-semibold text-xl tracking-wide uppercase"
          initial={{ opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          {label}
        </motion.div>
        {/* Decorative line */}
        <motion.div
          className="w-16 h-1 bg-orange-400 mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          transition={{ delay: index * 0.2 + 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scaleX: 1.2 }}
          whileInView={{ scaleX: 1 }}
        />
      </div>
    </motion.div>
  );
}

// Floating particles component - optimized
function FloatingParticles() {
  // Reduced number of particles for better performance
  const numParticles = 8;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(numParticles)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, 20], // Simpler vertical movement
            opacity: [0, 1, 0], // Simple fade in/out
          }}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          transition={{
            duration: 6 + Math.random() * 4, // Longer duration
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
      icon: <Trophy className="size-10" />,
      value: 50,
      label: "Happy Clients",
      suffix: "+",
    },
    {
      icon: <Star className="size-10" />,
      value: 10,
      label: "Years of Working Experience",
      suffix: "%",
    },
    {
      icon: <TrendingUp className="size-10" />,
      value: 100,
      label: "Met 100% of Deadlines",
      suffix: "%",
    },
  ];

  return (
    <section className="relative h-auto py-24 bg-orange-500 overflow-hidden">
      {/* Animated background elements - optimized */}
      <div className="absolute inset-0">
        {/* Gradient orbs - reduced blur and simplified animations */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3], // Only opacity animation
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/40 rounded-full blur-xl" // Reduced blur
          transition={{
            duration: 10, // Longer duration
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          animate={{
            opacity: [0.6, 0.3, 0.6], // Only opacity animation
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-xl" // Reduced blur
          transition={{
            duration: 12, // Longer duration
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          animate={{
            rotate: 360, // Keep rotation
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-400/10 rounded-full blur-xl" // Reduced blur
          transition={{
            rotate: {
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
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
              index={index}
              label={counter.label}
              suffix={counter.suffix}
              value={counter.value}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
