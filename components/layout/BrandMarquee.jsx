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
  {
    src: "/assets/logos/comfort.png",
    alt: "comfort",
  },
];

const BrandMarquee = () => {
  // Create a larger set of logos for smooth infinite scrolling
  const repeatedLogos = [
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
  ];

  return (
    <div className="w-full overflow-hidden bg-transparent ">
      {/* <div className="container mx-auto px-6 mb-8">
        <div className="text-center">
          <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">
            We Worked With
          </h3>
        </div>
      </div> */}

      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee">
          {repeatedLogos.map((logo, index) => (
            <div
              key={index}
              className="mx-8 w-32 md:w-44 aspect-[3/2] flex items-center justify-center group"
            >
              <img
                className="w-full h-full rounded-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out transform group-hover:scale-110"
                src={logo.src}
                alt={logo.alt}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default BrandMarquee;
