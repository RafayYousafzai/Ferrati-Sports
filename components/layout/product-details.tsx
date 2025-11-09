import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import Link from "next/link";

import Separator from "../separator";

interface CareersSectionProps {
  sectionTitle?: null | string;
  headline: string;
  description: string[];
  buttonText?: string;
  image: string;
  variant?: "orange" | "white";
  className?: string;
  reversed?: boolean;
  href?: string;
  showButton?: boolean;
  children?: React.ReactNode;
}

export default function ProductDetails({
  sectionTitle = null,
  headline,
  description,
  buttonText,
  image,
  variant = "orange",
  className = "",
  reversed = false,
  href = "#",
  showButton = true,
  bgColor = "bg-white",
  children,
}: CareersSectionProps) {
  const isOrange = variant === "orange";

  return (
    <section
      className={`py-10 px-6 ${isOrange ? "bg-orange-500" : bgColor} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start  ${
            reversed ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* Left Content (swaps to right when reversed) */}
          <div className={`space-y-8   -mt-2 ${reversed ? "lg:order-2" : ""}`}>
            <div>
              {sectionTitle && (
                <span
                  className={`font-bold text-sm tracking-[0.2em] uppercase mb-6 block ${
                    isOrange ? "text-white" : "text-orange-500"
                  }`}
                >
                  {sectionTitle}
                </span>
              )}
              <h2
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] ${
                  isOrange ? "text-white" : "text-gray-900"
                }`}
              >
                {headline}
              </h2>
              <Separator bg={"accent"} className={"ml-0"} />

              {/* <div
                className={`w-16 h-1 mb-8 ${
                  isOrange ? "bg-white" : "bg-orange-500"
                }`}
              /> */}
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
            {children && children}
            {showButton && buttonText && (
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
            <div className="relative w-full h-full  justify-center flex items-center">
              {/* Main large image */}
              <Image
                isBlurred
                isZoomed
                alt="HeroUI Album Cover"
                className="w-full h-full aspect-square transform rotate-1 hover:rotate-0 transition-transform duration-300"
                src={
                  image ||
                  "https://images.unsplash.com/photo-1599009434802-ca1dd09895e7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
