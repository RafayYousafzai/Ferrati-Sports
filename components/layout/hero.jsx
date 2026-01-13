"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Check, CheckCircle } from "lucide-react";
import EditableText from "@/components/editable-text";
import EditableImage from "@/components/editable-image";

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

      {/* Top spacer for desktop centering */}
      <div className="hidden lg:block flex-1" />

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8 flex-grow lg:flex-grow-0 flex flex-col justify-center mt-16 sm:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Left side - Text */}
          <div className="relative flex flex-col justify-center order-1 lg:order-1 animate-fade-in-up z-20 items-center lg:items-start sm:text-center text-center text-balance lg:text-left">
            <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-[40px] xl:text-5xl sm:font-bold font-semibold leading-tight text-gray-900 dark:text-white tracking-tight mt-0 ">
              Helping apparel brands build reliable, high-quality products
              <span className="text-orange-500 block mb-5 mt-2 font-semibold">
                without production headaches.
              </span>
            </h1>

            <EditableText
              id="hero_description"
              initialContent={contentMap["hero_description"]}
              multiline
              className="text-gray-800 dark:text-gray-300 text-sm sm:text-lg lg:text-xl max-w-xl leading-relaxed font-medium mx-auto sm:mx-0 mb-8"
              as="p"
            />

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-0">
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
          </div>

          {/* Points section - appears before image on mobile, below on desktop */}
          <div className="order-2 lg:order-3 lg:col-span-2 my-6 md:hidden ">
            <div className="grid grid-cols-2 lg:flex lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4 w-full">
              <div className="flex items-center justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-500 flex-shrink-0" />
                <span>200+ Brands Served</span>
              </div>
              <div className="flex items-center justify-end lg:justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-500 flex-shrink-0" />
                <span>100+ Fabrics Choice</span>
              </div>
              <div className="flex items-center justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-500 flex-shrink-0" />
                <span>Free Replacement Policy</span>
              </div>
              <div className="flex items-center justify-end lg:justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-500 flex-shrink-0" />
                <span>50 Min Order Qty ‎ ‎ ‎ </span>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex order-3 lg:order-2 w-full justify-center lg:justify-end animate-fade-in-up delay-200">
            <div className="relative w-full max-w-[500px] lg:max-w-[600px]">
              <EditableImage
                id="hero_image"
                defaultValue="https://cdn.dribbble.com/userupload/45265328/file/55fd13997376b63a889231bcf7ff9fb0.webp?resize=1504x1128&vertical=center"
                initialContent={contentMap["hero_image"]}
                className="w-full"
                renderImage={(src) => (
                  <Image
                    src={src}
                    alt="Custom Sportswear"
                    width={1504}
                    height={1128}
                    priority
                    className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="order-2 lg:order-3 lg:col-span-2 mt-10 hidden md:block lg:hidden">
          <div className="grid grid-cols-2 lg:flex lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4 w-full">
            <div className="flex items-center justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-500 flex-shrink-0" />
              <span>200+ Brands Served</span>
            </div>
            <div className="flex items-center justify-end lg:justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-500 flex-shrink-0" />
              <span>100+ Fabrics Choice</span>
            </div>
            <div className="flex items-center justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-500 flex-shrink-0" />
              <span>Free Replacement Policy</span>
            </div>
            <div className="flex items-center justify-end lg:justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-500 flex-shrink-0" />
              <span>50 Min Order Qty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer with points for desktop */}
      <div className="hidden lg:flex flex-1 w-full items-center justify-center relative z-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
              <CheckCircle className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0" />
              <span>200+ Brands Served</span>
            </div>
            <div className="flex items-center justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
              <CheckCircle className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0" />
              <span>100+ Fabrics Choice</span>
            </div>
            <div className="flex items-center justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
              <CheckCircle className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0" />
              <span>Free Replacement Policy</span>
            </div>
            <div className="flex items-center justify-start text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
              <CheckCircle className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0" />
              <span>50 Min Order Qty</span>
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
