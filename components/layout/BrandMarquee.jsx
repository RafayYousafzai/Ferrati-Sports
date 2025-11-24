"use client";
import React from "react";

const logos = [
  {
    src: "/assets/logos/riderich.png",
    alt: "riderich",
  },
  {
    src: "/assets/logos/ghostbikes.png",
    alt: "ghostbikes",
  },
  {
    src: "/assets/logos/agrius.png",
    alt: "agrius",
  },
];

const BrandMarquee = () => {
  // Commented out marquee animation - uncomment if more logos are added in the future
  // const repeatedLogos = [
  //   ...logos,
  //   ...logos,
  //   ...logos,
  //   ...logos,
  //   ...logos,
  //   ...logos,
  // ];

  return (
    <div className="w-full -24 ">
      <div className="container mx-auto px-6">
        <div className="text-center my-8">
          <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">
            We Worked With
          </h3>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="group relative w-32 md:w-44 aspect-[3/2] flex items-center justify-center transition-all duration-500"
            >
              <img
                className="w-full h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out transform group-hover:scale-110"
                src={logo.src}
                alt={logo.alt}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Marquee animation styles - uncomment if more logos are added */}
      {/* <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style> */}
    </div>
  );
};

export default BrandMarquee;
