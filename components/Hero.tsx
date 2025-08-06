"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Separator from "./Separator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/button";

const defaultDescription =
  "Unleash your potential with Ferrati Impex. Gear up with our premium sportswear, designed to enhance your performance and help you achieve greatness.";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image:
        "https://healingconsultingturkey.com/wp-content/uploads/2021/04/sports-ortho-1.jpg",
      badge: "Coffee",
      title: "Want to Start Your Custom Order",
      description: defaultDescription,
    },
    {
      image:
        "https://www.uchealth.com/content/dam/uchealth/images/media-room/articles/olympians-vs-average-people-RUNNING.png",
      badge: "Artisan",
      title: "Are you still struggling in 2025?",
      description: defaultDescription,
    },
    {
      image:
        "https://goharsports.com.pk/wp-content/uploads/2019/08/sports-wears-banner.jpg",
      badge: "Fresh",
      title: "Want to scale in 2025?",
      description: defaultDescription,
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="h-screen relative text-white overflow-hidden">
      {/* overlay */}
      <div className="bg-hero_overlay absolute w-full h-full z-10 bg-black/[0.70]" />
      {/* Image slider */}
      <div className="absolute top-0 left-0 w-full h-full bg-black">
        {" "}
        {/* Added bg-black here */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlideData.image} // Key on the image URL itself
            src={currentSlideData.image || "/placeholder.svg"}
            alt={`Slide ${currentSlide + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full object-cover absolute top-0 left-0" // Ensure it covers the black background
          />
        </AnimatePresence>
      </div>
      {/* Navigation arrows */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors backdrop-blur-sm hidden md:flex" // Added hidden md:flex
        aria-label="Previous slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>
      <motion.button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors backdrop-blur-sm hidden md:flex" // Added hidden md:flex
        aria-label="Next slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-accent"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
      <div className="container mx-auto h-full flex flex-col xl:flex-row items-start z-30 relative px-4">
        {/* Dynamic text content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-scroll
            data-scroll-speed="0.4"
            className="flex-1 flex flex-col text-left justify-center xl:pb-12 gap-10 h-full"
          >
            {/* badge & h1 with animation */}
            <motion.div variants={itemVariants} className="flex flex-col  ">
              <h1 className="font-bold text-5xl md:text-6xl text-white">
                {currentSlideData.title}
              </h1>
            </motion.div>
            {/* separator */}
            <motion.div className="w-10" variants={itemVariants}>
              <Separator />
            </motion.div>
            {/* Dynamic description with smooth transition */}
            <motion.p
              variants={itemVariants}
              className="lead font-light  w-[80%] md:max-w-[450px] xl:max-w-[560px] mb-4 text-xl"
            >
              {currentSlideData.description}
            </motion.p>
            {/* Dynamic button */}
            <Button className="btn w-full md:w-sm px-6  py-2 cursor-pointer bg-white text-black ">
              Learn more about our services and products
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
