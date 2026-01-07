"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, CheckCircle } from "lucide-react";
import EditableText from "@/components/editable-text";

const Portfolio = ({ contentMap = {} }) => {
  return (
    <div className="min-h-[100vh] w-full relative font-sans flex flex-col justify-center overflow-hidden py-12 lg:py-0">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 dark:hidden bg-gradient-to-b from-gray-50 to-white" />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      />

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text */}
          <div className="relative flex flex-col justify-center order-2 lg:order-1 animate-fade-in-up z-20 items-center sm:items-start text-center sm:text-left">
            <h1 className="italic text-4xl sm:text-xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-none text-gray-900 dark:text-white tracking-tight mt-0">
              Custom Apparel Manufacturing
              <span className="text-orange-500 block mb-2">Made Easy.</span>
            </h1>

            <EditableText
              id="hero_description"
              initialContent={contentMap["hero_description"]}
              multiline
              className="text-gray-600 dark:text-gray-300 text-sm sm:text-lg lg:text-xl max-w-xl leading-relaxed font-medium mx-auto sm:mx-0"
              as="p"
            />

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4">
              <Link href="/request-quote" passHref>
                <button className="w-full sm:w-auto px-6 py-3 lg:px-6 lg:py-3 xl:px-8 xl:py-4 bg-orange-500 dark:bg-orange-500 text-white hover:bg-orange-700 dark:hover:bg-orange-600 rounded-full uppercase font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 tracking-wider text-xs sm:text-sm xl:text-base whitespace-nowrap">
                  Request Free Quote
                </button>
              </Link>
              <Link href="https://calendly.com/ferratisports/30min" passHref>
                <button className="w-full sm:w-auto px-6 py-3 lg:px-6 lg:py-3 xl:px-8 xl:py-4 bg-transparent border-2 border-orange-500 dark:border-gray-600 text-orange-500 dark:text-white hover:bg-orange-500 hover:text-white dark:hover:bg-gray-800 rounded-full uppercase font-bold transition-all duration-300 hover:scale-105 active:scale-95 tracking-wider text-xs sm:text-sm xl:text-base whitespace-nowrap">
                  Free Consultation
                </button>
              </Link>
            </div>

            <div className="pt-4">
              <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 w-full justify-items-center sm:justify-items-start">
                <div className="flex items-center justify-center sm:justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-500 flex-shrink-0" />
                  <span>200+ Brands Served</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-500 flex-shrink-0" />
                  <span>100+ Fabrics</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-500 flex-shrink-0" />
                  <span>Replacement Policy</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-500 flex-shrink-0" />
                  <span>50+ Order</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex order-1 lg:order-2 w-full justify-center lg:justify-end animate-fade-in-up delay-200">
            <div className="relative w-full max-w-[500px] lg:max-w-[600px]">
              <Image
                src="https://cdn.dribbble.com/userupload/45265328/file/55fd13997376b63a889231bcf7ff9fb0.webp?resize=1504x1128&vertical=center"
                alt="Custom Sportswear"
                width={1504}
                height={1128}
                priority
                className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
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
