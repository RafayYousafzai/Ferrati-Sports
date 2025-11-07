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

        {/* Categories Layout */}
        <div className="flex pb-10 gap-4">
          {/* Left side */}
          <div className="flex flex-col gap-4 w-1/2">
            <Link
              href={`/${categories[0]?.slug || categories[0]?.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800 block transition-all duration-300  hover:scale-[1.02] aspect-square w-full"
            >
              <div className="relative w-full h-full">
                <Image
                  fill
                  alt={categories[0]?.title}
                  className="object-cover"
                  src={categories[0]?.image_url}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="text-white text-lg sm:text-xl font-semibold">
                  {categories[0]?.title}
                </h3>
              </div>
            </Link>

            <div className="flex gap-4">
              <Link
                href={`/${categories[1]?.slug || categories[1]?.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800 block transition-all duration-300  hover:scale-[1.02] aspect-square w-1/2"
              >
                <div className="relative w-full h-full">
                  <Image
                    fill
                    alt={categories[1]?.title}
                    className="object-cover"
                    src={categories[1]?.image_url}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="text-white text-lg sm:text-xl font-semibold">
                    {categories[1]?.title}
                  </h3>
                </div>
              </Link>

              <Link
                href={`/${categories[2]?.slug || categories[2]?.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800 block transition-all duration-300  hover:scale-[1.02] aspect-square w-1/2"
              >
                <div className="relative w-full h-full">
                  <Image
                    fill
                    alt={categories[2]?.title}
                    className="object-cover"
                    src={categories[2]?.image_url}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="text-white text-lg sm:text-xl font-semibold">
                    {categories[2]?.title}
                  </h3>
                </div>
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex gap-4">
              <Link
                href={`/${categories[3]?.slug || categories[3]?.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800 block transition-all duration-300  hover:scale-[1.02] aspect-square w-1/2"
              >
                <div className="relative w-full h-full">
                  <Image
                    fill
                    alt={categories[3]?.title}
                    className="object-cover"
                    src={categories[3]?.image_url}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="text-white text-lg sm:text-xl font-semibold">
                    {categories[3]?.title}
                  </h3>
                </div>
              </Link>

              <Link
                href={`/${categories[4]?.slug || categories[4]?.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800 block transition-all duration-300  hover:scale-[1.02] aspect-square w-1/2"
              >
                <div className="relative w-full h-full">
                  <Image
                    fill
                    alt={categories[4]?.title}
                    className="object-cover"
                    src={categories[4]?.image_url}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="text-white text-lg sm:text-xl font-semibold">
                    {categories[4]?.title}
                  </h3>
                </div>
              </Link>
            </div>

            <Link
              href={`/${categories[5]?.slug || categories[5]?.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800 block transition-all duration-300  hover:scale-[1.02] aspect-square w-full"
            >
              <div className="relative w-full h-full">
                <Image
                  fill
                  alt={categories[5]?.title}
                  className="object-cover"
                  src={categories[5]?.image_url}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="text-white text-lg sm:text-xl font-semibold">
                  {categories[5]?.title}
                </h3>
              </div>
            </Link>
          </div>
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
