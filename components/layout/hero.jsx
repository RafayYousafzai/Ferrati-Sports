"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { motion, AnimatePresence } from "framer-motion";
import Separator from "../separator";
import Link from "next/link";
import { Image } from "@heroui/image";

const mobileImage =
  "https://images.unsplash.com/photo-1619032468883-89a84f565cba?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const defaultDescription =
  "Unleash your potential with Ferrati Impex. Gear up with our premium sportswear, designed to enhance your performance and help you achieve greatness.";

const HERO_IMAGE = "/assets/hero.webp";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/assets/cat1.webp",
      badge: "Coffee",
      title: "Want to Start Your Custom Order?",
      description: defaultDescription,
    },
    {
      image: "/assets/cat2.webp",
      badge: "Artisan",
      title: "Are you still struggling in 2025?",
      description: defaultDescription,
    },
    {
      image: "/assets/cat4.webp",
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

  const currentSlideData = slides[currentSlide];

  // Animation variants for text
  const textVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 0 },
  };

  return (
    <section className="h-[90vh] relative text-white overflow-hidden">
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
        <div className="flex-1 flex flex-col text-left justify-center xl:pb-12 gap-10 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={textVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
              data-scroll
              data-scroll-speed="0.4"
            >
              {/* Badge & h1 */}
              <div className="flex flex-col">
                <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-white">
                  {currentSlideData.title}
                </h1>
              </div>
              {/* Separator */}
            </motion.div>
          </AnimatePresence>
          <div className="w-10">
            <Separator />
          </div>
          <p className="lead font-light w-[80%] md:max-w-[450px] xl:max-w-[560px] mb-4 text-xl">
            {currentSlideData.description}
          </p>
          <div className="flex flex-col gap-4">
            <Link href="/request-quote">
              <Button
                radius="sm"
                className="btn w-full md:w-sm px-6 py-2 cursor-pointer bg-orange-500 text-white"
              >
                Get Quote
              </Button>
            </Link>
            <Link href="/services/0c6e3849-b21e-468f-bb43-44cd5284ac4f">
              <Button
                radius="sm"
                className="btn w-full md:w-sm px-6 py-2 cursor-pointer bg-orange-500 text-white"
              >
                Get a Free Sample
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
