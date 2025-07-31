"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "./Badge";
import Separator from "./Separator";
import { ChevronLeft, ChevronRight } from "lucide-react";

const img =
  "https://plus.unsplash.com/premium_photo-1753071355370-e8025111987f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8";

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
      buttonText: "Our menu",
    },
    {
      image:
        "https://www.uchealth.com/content/dam/uchealth/images/media-room/articles/olympians-vs-average-people-RUNNING.png",
      badge: "Artisan",
      title: "Are you still struggling in 2025?",
      description: defaultDescription,
      buttonText: "Our menu",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZEISp6Ewt7leISD5qFZtnylN8YD0f5zRfX4-5ulwSSYiTmRkl2-vT8jCtFPXJCbHXZ8Y&usqp=CAU",
      badge: "Fresh",
      title: "Want to scale in 2025?",
      description: defaultDescription,
      buttonText: "Our menu",
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
    <section className="h-[80vh] xl:h-screen relative text-white overflow-hidden">
      {/* overlay */}
      <div className="bg-hero_overlay absolute w-full h-full z-10 bg-black/[0.70]" />

      {/* Image slider */}
      <div className="absolute top-0 left-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <img
              src={currentSlideData.image || "/placeholder.svg"}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {/* <motion.button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors backdrop-blur-sm"
        aria-label="Next slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button> */}

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

      <div className="container mx-auto h-full flex flex-col xl:flex-row items-center z-30 relative">
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
            className="flex-1 flex flex-col text-center justify-center items-center xl:pb-12 gap-10 h-full"
          >
            {/* badge & h1 with animation */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <Badge containerStyles="hidden xl:flex xl:w-[180px] xl:h-[180px]" />
              <h1 className=" font-[Cormorant_Upright] text-5xl md:text-8xl text-[#d74913]">
                {currentSlideData.title}
              </h1>
            </motion.div>

            {/* separator */}
            <motion.div variants={itemVariants}>
              <Separator />
            </motion.div>

            {/* Dynamic description with smooth transition */}
            <motion.p
              variants={itemVariants}
              className="lead font-light max-w-[300px] md:max-w-[430px] xl:max-w-[560px] mb-4 text-xl"
            >
              {currentSlideData.description}
            </motion.p>

            {/* Dynamic button */}
            <motion.button
              variants={itemVariants}
              className="btn px-6 py-2 cursor-pointer bg-[#d74913] "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentSlideData.buttonText}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
