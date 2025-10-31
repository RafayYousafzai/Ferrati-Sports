"use client";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import Separator from "../separator";
import Link from "next/link";
import { Image } from "@heroui/image";

const mobileImage =
  "https://images.unsplash.com/photo-1619032468883-89a84f565cba?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const HERO_IMAGE = "/assets/hero.webp";

const Hero = () => {
  // Animation variants for text
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <section className="h-[90vh] relative text-white overflow-hidden mt-[10vh]">
      {/* Image slider */}
      <div className="absolute top-0 left-0 w-full h-full bg-black">
        <div className="hidden md:block w-full h-full relative">
          <div className="w-full h-full absolute top-0 left-0">
            <Image
              className="object-cover  w-screen opacity-75 h-[90vh] rounded-none"
              src={HERO_IMAGE}
            />
          </div>
        </div>
        <div className="md:hidden block">
          <Image
            className="object-cover h-[90vh] w-screen opacity-75 rounded-none"
            src={HERO_IMAGE}
          />
        </div>
      </div>
      {/* Overlay - moved after image for correct stacking */}
      <div className="absolute w-full h-full z-10 bg-black/70 pointer-events-none" />

      <div className="container mx-auto h-full flex flex-col xl:flex-row items-start z-30 relative px-4">
        {/* Dynamic text content */}
        <div className="flex-1 flex flex-col text-left justify-center xl:pb-12 gap-6 h-full">
          <motion.div
            initial="initial"
            animate="animate"
            variants={textVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Headline */}
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
                From Sketch to Store in{" "}
                <span className="text-orange-400">30 Days</span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-200 font-light">
                Custom Sportswear Manufacturing That's Fast, Flexible, and
                Reliable.
              </p>
            </div>
          </motion.div>

          {/* Separator */}
          <div className="w-10">
            <Separator />
          </div>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-gray-100 max-w-[600px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Stop worrying about delays, minimums, and poor quality.
            <br />
            <span className="text-orange-300 font-semibold">
              Ferrati Sports helps you bring your vision to life on time and on
              budget.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link href="/request-quote">
              <Button
                radius="sm"
                size="lg"
                className="w-full sm:w-auto px-8 py-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get a Quote
              </Button>
            </Link>
            <Link href="/services/free-clothing-samples">
              <Button
                radius="sm"
                size="lg"
                className="w-full sm:w-auto px-8 py-6 bg-white text-orange-600 hover:bg-gray-100 font-semibold text-lg border-2 border-white shadow-lg hover:shadow-xl transition-all"
              >
                Request Sample Kit
              </Button>
            </Link>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            className="flex flex-wrap gap-6 mt-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-orange-400 text-2xl font-bold">200+</span>
              <span className="text-sm">Brands Served</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-400 text-2xl font-bold">30</span>
              <span className="text-sm">Day Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-400 text-2xl font-bold">50</span>
              <span className="text-sm">Unit Low MOQ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-400 text-2xl font-bold">✓</span>
              <span className="text-sm">Factory Direct</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
