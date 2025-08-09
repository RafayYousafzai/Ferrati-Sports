"use client";

import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import Link from "next/link";

interface CareersSectionProps {
  sectionTitle?: string;
  headline: string;
  description: string[];
  buttonText?: string;
  image: string;
  variant?: "orange" | "white";
  className?: string;
  reversed?: boolean;
  href?: string;
  showButton?: boolean;
}

export default function ProductDetails({
  sectionTitle = "CAREERS",
  headline,
  description,
  buttonText = "Search and apply",
  image,
  variant = "orange",
  className = "",
  reversed = false,
  href = "#",
  showButton = true,
}: CareersSectionProps) {
  const isOrange = variant === "orange";

  return (
    <section
      className={`py-10 px-6 ${isOrange ? "bg-orange-500" : "bg-white"} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            reversed ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* Left Content (swaps to right when reversed) */}
          <div className={`space-y-8 ${reversed ? "lg:order-2" : ""}`}>
            <div>
              <span
                className={`font-bold text-sm tracking-[0.2em] uppercase mb-6 block ${
                  isOrange ? "text-white" : "text-orange-500"
                }`}
              >
                {sectionTitle}
              </span>

              <h2
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] ${
                  isOrange ? "text-white" : "text-gray-900"
                }`}
              >
                {headline}
              </h2>

              <div
                className={`w-16 h-1 mb-8 ${
                  isOrange ? "bg-white" : "bg-orange-500"
                }`}
              />
            </div>

            <div className="space-y-6">
              {description.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-lg leading-relaxed ${
                    isOrange ? "text-white" : "text-gray-600"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {showButton && (
              <div className="pt-4">
                <Link href={href}>
                  <Button
                    className={`px-8 py-3 text-base font-medium ${
                      isOrange
                        ? "text-orange-500 bg-white"
                        : "bg-orange-500 text-white"
                    }`}
                    size="lg"
                    variant="solid"
                  >
                    {buttonText}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Right Images Collage (swaps to left when reversed) */}
          <div className={`relative ${reversed ? "lg:order-1" : ""}`}>
            <div className="relative h-[500px] lg:h-[600px] justify-center flex items-center">
              {/* Main large image */}
              <Image
                isBlurred
                isZoomed
                alt="HeroUI Album Cover"
                className="w-full h-full aspect-square transform rotate-1 hover:rotate-0 transition-transform duration-300"
                height={500}
                src={image}
                width={500}
              />

              {/* Decorative elements */}
              <div
                className={`absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 ${
                  isOrange ? "bg-white" : "bg-orange-500"
                }`}
              />
              <div
                className={`absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10 ${
                  isOrange ? "bg-white" : "bg-orange-500"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
