"use client";

import React from "react";
import BrandMarquee from "./BrandMarquee";
import Link from "next/link";
import { Check } from "lucide-react";
const DotIcon = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="4" r="4" fill="currentColor" />
  </svg>
);

const Portfolio = () => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center font-sans p-4 sm:p-6 lg:p-8">
      {}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        // style={{
        //   background:
        //     "radial-gradient(125% 125% at 50% 100%, #ffffff 40%, #3b82f6 100%)",
        // }}
      />

      {}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      />

      {}
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-16 items-center">
          {}
          <div className="flex flex-col gap-4 sm:gap-6 items-start text-left lg:order-1 animate-fade-in-up">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500 rounded-full text-xs sm:text-sm text-white backdrop-blur-sm transition-all duration-300">
              <DotIcon />
              Welcome to Ferrati Sports
            </div> */}
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                Get Your Custom Sportswear in <br />
                <span className="bg-gradient-to-r from-orange-500 to-orange-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  30 Days
                </span>
              </h1>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-md max-w-lg leading-relaxed">
              We make high-quality custom sportswear that's built to last.
              Whether you're launching a new brand, outfitting a team, or
              expanding your product line, we handle everything from design to
              delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto">
              <Link href="/request-quote" passHref>
                <button className="w-full sm:w-auto px-6 py-3 bg-orange-500 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-orange-500 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                  Get Quote
                </button>
              </Link>
              <Link href="/services/free-clothing-samples" passHref>
                <button className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95">
                  Request Sample Kit
                </button>
              </Link>
            </div>

            <div className="flex justify-around">
              <p className="items-center justify-around text-xs flex flex-row">
                <Check className="bg-orange-500 rounded-full text-white text-sm  mr-2 p-1" />{" "}
                point 1
              </p>{" "}
              <p className="items-center justify-around text-xs flex flex-row">
                <Check className="bg-orange-500 rounded-full text-white text-sm ml-6 mr-2 p-1" />{" "}
                point 1
              </p>{" "}
              <p className="items-center justify-around text-xs flex flex-row">
                <Check className="bg-orange-500 rounded-full text-white text-sm ml-6 mr-2 p-1" />{" "}
                point 1
              </p>{" "}
              <p className="items-center justify-around text-xs flex flex-row">
                <Check className="bg-orange-500 rounded-full text-white text-sm ml-6 mr-2 p-1" />{" "}
                point 1
              </p>
            </div>
          </div>

          {}
          {/* Right side - Image (Hidden on mobile) */}
          <div className="hidden lg:block lg:order-2 animate-fade-in-up">
            <div className="relative flex justify-center w-full h-[600px] mt-20">
              <img
                src="https://cdn.dribbble.com/userupload/45265328/file/55fd13997376b63a889231bcf7ff9fb0.webp?resize=1504x1128&vertical=center"
                alt="Custom Sportswear"
                className="w-[80%] h-[80%] object-cover rounded-2xl"
              />
              {/* Optional gradient overlay */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div> */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-0 left-0 w-full">
        <BrandMarquee />
      </div> */}
    </div>
  );
};
export default Portfolio;
const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }

  .hover\\:shadow-3xl:hover {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
  }
`;
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
