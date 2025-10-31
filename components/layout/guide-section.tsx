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
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-8 mb-6">
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Story & Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="prose prose-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded by{" "}
                <span className="font-semibold text-gray-900">Ahmed Raza</span>,
                a global business graduate and passionate entrepreneur, Ferrati
                Sports was created to simplify manufacturing for brand owners
                who expect excellence.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We understand the frustration of dealing with unreliable
                manufacturers. That&apos;s why we built a company that puts your
                brand first.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4 items-start"
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
                    <h3 className="font-bold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-md lg:text-lg text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="relative h-64 overflow-hidden rounded-lg shadow-lg">
                <Image
                  height={300}
                  width={300}
                  src="/assets/cat1.webp"
                  alt="Manufacturing facility"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="relative h-48 overflow-hidden rounded-lg shadow-lg">
                <Image
                  height={300}
                  width={300}
                  src="/assets/cat2.webp"
                  alt="Quality stitching"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="relative h-48 overflow-hidden rounded-lg shadow-lg">
                <Image
                  height={300}
                  width={300}
                  src="/assets/cat4.webp"
                  alt="Packaging process"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="relative h-64 overflow-hidden rounded-lg shadow-lg">
                <Image
                  height={300}
                  width={300}
                  src="/assets/hero.webp"
                  alt="Team at work"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">200+</div>
            <div className="text-sm text-gray-700 font-medium">
              Brands Served
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">30</div>
            <div className="text-sm text-gray-700 font-medium">
              Day Delivery
            </div>
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
    </section>
  );
}
