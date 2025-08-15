"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Separator from "../separator";

const defaultDescription =
  "Unleash your potential with Ferrati Impex. Gear up with our premium sportswear, designed to enhance your performance and help you achieve greatness.";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/assets/cat1.png",
      badge: "Coffee",
      title: "Want to Start Your Custom Order?",
      description: defaultDescription,
    },
    {
      image: "/assets/cat2.png",
      badge: "Artisan",
      title: "Are you still struggling in 2025?",
      description: defaultDescription,
    },
    {
      image: "/assets/cat4.png",
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

  // Animation variants for image
  const imageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Animation variants for text
  const textVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="h-[92vh] relative text-white overflow-hidden">
      {/* Overlay */}
      <div className="bg-hero_overlay absolute w-full h-full z-10 bg-black/[0.70]" />
      {/* Image slider */}
      <div className="absolute top-0 left-0 w-full h-full bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={imageVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full absolute top-0 left-0"
          >
            <Image
              fill
              priority
              alt={`Slide ${currentSlide + 1}`}
              className="object-cover"
              src={currentSlideData.image || "/placeholder.svg"}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Navigation arrows */}
      <button
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors backdrop-blur-sm hidden md:flex"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        aria-label="Next slide"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors backdrop-blur-sm hidden md:flex"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-accent"
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      <div className="container mx-auto h-full flex flex-col xl:flex-row items-start z-30 relative px-4">
        {/* Dynamic text content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={textVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-scroll
            className="flex-1 flex flex-col text-left justify-center xl:pb-12 gap-10 h-full"
            data-scroll-speed="0.4"
          >
            {/* Badge & h1 */}
            <div className="flex flex-col">
              <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-white">
                {currentSlideData.title}
              </h1>
            </div>
            {/* Separator */}
            <div className="w-10">
              <Separator />
            </div>
            {/* Dynamic description */}
            <p className="lead font-light w-[80%] md:max-w-[450px] xl:max-w-[560px] mb-4 text-xl">
              {currentSlideData.description}
            </p>
            {/* Dynamic button */}
            <Button className="btn w-full md:w-sm px-6 py-2 cursor-pointer bg-white text-black">
              Learn more about our services and products
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
