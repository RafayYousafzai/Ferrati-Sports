"use client";

import React from "react";
import BrandMarquee from "./BrandMarquee";
import Link from "next/link";
import Image from "next/image";
import { Check, CheckCircle } from "lucide-react";
import EditableText from "@/components/editable-text";

const Portfolio = ({ contentMap = {} }) => {
  return (
    <div className="min-h-screen w-full relative font-sans flex flex-col justify-between pt-[12vh]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 dark:hidden" />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      />

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-12 lg:py-0">
          {/* Left side - Text */}
          <div className="relative flex flex-col gap-6 items-start text-left order-2 lg:order-1 animate-fade-in-up">
            <div className="relative">
              <h1 className="italic sm:text-4xl lg:text-4xl md:text-3xl xl:text-[44px] font-bold leading-tight text-gray-900 dark:text-white">
                Custom Apparel Manufacturing{"-"}
                <span className="text-orange-500">Made Easy.</span>
                <EditableText
                  id="hero_title_2"
                  initialContent={contentMap["hero_title_2"]}
                  className="bg-gradient-to-r  from-orange-500 to-orange-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
                  as="span"
                />
              </h1>
            </div>

            <EditableText
              id="hero_description"
              // defaultValue="We make high-quality custom sportswear that's built to last. Whether you're launching a new brand, outfitting a team, or expanding your product line, we handle everything from design to delivery."
              initialContent={contentMap["hero_description"]}
              multiline
              className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-lg leading-relaxed"
              as="p"
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
              <Link href="/request-quote" passHref>
                <button className="w-full sm:w-auto px-8 py-3.5 bg-orange-500 dark:bg-orange-500 text-white hover:bg-orange-700 dark:hover:bg-orange-600 rounded-full uppercase font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 tracking-wider text-sm sm:text-base">
                  Request Free Quote
                </button>
              </Link>
              <Link href="https://calendly.com/ferratisports/30min" passHref>
                <button className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-orange-500 dark:border-gray-600 text-orange-500 dark:text-white hover:bg-orange-500 hover:text-white dark:hover:bg-gray-800 rounded-full uppercase font-bold transition-all duration-300 hover:scale-105 active:scale-95 tracking-wider text-sm sm:text-base">
                  Free Consultation
                </button>
              </Link>
            </div>

            <div className="fixed -bottom-20 left-0 ">
              <div className="flex flex-wrap gap-1 sm:gap-2 w-full">
                <div className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 mr-1 text-orange-500 flex-shrink-0" />

                  <span className="">200+ Brands Served</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 mr-1 ml-1 text-orange-500 flex-shrink-0" />

                  <span className="">100+ Fabrics</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 mr-1 ml-1 text-orange-500 flex-shrink-0" />

                  <span className="">Replacement Policy</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 mr-1 ml-1 text-orange-500 flex-shrink-0" />

                  <span className="">50+ Order</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex order-1 lg:order-2 animate-fade-in-up items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
              <Image
                src="https://cdn.dribbble.com/userupload/45265328/file/55fd13997376b63a889231bcf7ff9fb0.webp?resize=1504x1128&vertical=center"
                alt="Custom Sportswear"
                width={1504}
                height={1128}
                priority
                className="w-full h-auto object-contain rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <BrandMarquee />
      </div>

      <style jsx>{`
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
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
export default Portfolio;
