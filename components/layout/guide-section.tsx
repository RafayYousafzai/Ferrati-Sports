"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Zap, DollarSign, Leaf } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Building2,
    title: "In-house manufacturing facility",
    description: "Complete control over quality and production",
  },
  {
    icon: Zap,
    title: "Fast, flexible production",
    description: "30-day delivery with low MOQ from 50 units",
  },
  {
    icon: DollarSign,
    title: "Transparent pricing",
    description: "No hidden costs or surprise charges",
  },
  {
    icon: Leaf,
    title: "Ethical and sustainable",
    description: "Responsible manufacturing practices",
  },
];

export default function GuideSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="container mx-auto px-4 max-w-7xl mb-20">
      <div className="bg-white py-16 px-10 lg:px-10 rounded-3xl shadow-md">
        {/* Header */}
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We Get It. That&apos;s Why We Built{" "}
            <span className="text-orange-600">Ferrati Sports.</span>
          </h2>
          <p className="text-xl text-balance text-gray-700 max-w-4xl mx-auto leading-relaxed">
            We&apos;ve helped over{" "}
            <span className="font-bold text-orange-600">
              200 apparel brands
            </span>{" "}
            across the UK, USA, and Europe bring their sportswear collections to
            life on time and on budget.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Story & Features */}
          <motion.div
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  className="flex gap-3 items-start my-3"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute -top-1 -left-1 w-10 h-10 bg-orange-500 rounded-sm opacity-20" />
                      <div className="relative bg-white p-2">
                        <feature.icon
                          className="w-6 h-6 text-orange-600"
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm lg:text-lg text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Single Image */}
          <motion.div
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Background Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl" />

            <div className="relative">
              <motion.div
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="relative h-80 overflow-hidden rounded-2xl shadow-xl group"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <Image
                  alt="Ferrati Sports Manufacturing"
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  height={600}
                  src="/assets/hero.webp"
                  width={800}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/20 to-transparent mix-blend-overlay" />
              </motion.div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-3 z-20 border-2 border-orange-100"
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-2">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-orange-600">200+</div>
                  <div className="text-xs text-gray-600 font-medium">
                    Brands Trust Us
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
