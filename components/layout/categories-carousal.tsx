"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/button";

import Header from "../custom-ui/header";

const CategoriesCarousal = ({ categories }: { categories: any }) => {
  return (
    <div className="pb-10  ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Header
          badge="Explore"
          highlightedTitle="Categories"
          subtitle="Discover our diverse range of premium sportswear and custom clothing solutions designed to elevate your brand."
          title="Our "
        />

        {/* Grid Layout */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((item: any, index: any) => {
            // Create different layouts for visual interest
            const isLarge = index === 0 || index === 4;
            const gridClass = isLarge
              ? "md:col-span-2 md:row-span-2"
              : "md:col-span-1";

            return (
              <Link
                key={index}
                className={`group relative ${gridClass} overflow-hidden rounded-3xl shadow-lg bg-white dark:bg-gray-800 block`}
                href={`/categories/${item.slug || item.id}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Image Container - Fixed height */}
                <div
                  className={`relative w-full ${isLarge ? "min-h-[450px]" : "min-h-[350px]"} h-full`}
                >
                  <Image
                    fill
                    alt={item.title}
                    className="object-cover"
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={item.image_url}
                  />

                  {/* Gradient Overlay - Always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Content Overlay - Always visible, better spacing */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  {/* Title - Controlled size */}
                  <h3
                    className={`${isLarge ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"} font-bold text-white mb-2 line-clamp-2`}
                  >
                    {item.title}
                  </h3>

                  {/* Description - Controlled overflow */}
                  <p
                    className={`text-gray-200 mb-3 leading-relaxed ${isLarge ? "text-sm sm:text-base line-clamp-3" : "text-xs sm:text-sm line-clamp-2"}`}
                  >
                    {item.description}
                  </p>

                  {/* Button */}
                  <div>
                    <Button
                      className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold"
                      size="sm"
                    >
                      Explore {item.title}
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link href="/categories">
            <Button
              className="bg-orange-500 dark:bg-blue-500 text-white hover:bg-orange-600 dark:hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold px-8 py-6"
              size="lg"
            >
              See All Categories
            </Button>
          </Link>
        </div>
      </div>

      {/* Add animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .grid > div {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default CategoriesCarousal;
