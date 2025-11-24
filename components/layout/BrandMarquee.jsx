"use client";
import React from "react";

const logos = [
  {
    src: "/assets/logos/agrius.png",
    alt: "agrius",
  },
  {
    src: "/assets/logos/riderich.png",
    alt: "riderich",
  },
  {
    src: "/assets/logos/ghostbikes.png",
    alt: "ghostbikes",
  },
];

const BrandMarquee = () => {
  // Repeat logos multiple times for seamless scroll
  const repeatedLogos = [
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
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
    <div className="relative w-full overflow-hidden  py-8">
      <div className="flex animate-marquee gap-10">
        {repeatedLogos.map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-16 mx-4">
            <img
              className="w-full h-auto rounded-full"
              src={logo.src}
              alt={logo.alt}
            />
          </div>
        ))}
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
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BrandMarquee;
