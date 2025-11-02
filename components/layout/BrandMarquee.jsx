"use client";
import React from "react";

const logos = [
  {
    src: "https://cdn.simpleicons.org/nike/000000",
    alt: "Nike",
  },
  {
    src: "https://cdn.simpleicons.org/adidas/000000",
    alt: "Adidas",
  },
  {
    src: "https://cdn.simpleicons.org/puma/000000",
    alt: "Puma",
  },
  {
    src: "https://cdn.simpleicons.org/underarmour/000000",
    alt: "Under Armour",
  },
  {
    src: "https://cdn.simpleicons.org/reebok/000000",
    alt: "Reebok",
  },
  {
    src: "https://cdn.simpleicons.org/newbalance/000000",
    alt: "New Balance",
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
  ];

  return (
    <div className="relative w-full overflow-hidden  py-8">
      <div className="flex animate-marquee">
        {repeatedLogos.map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-16 mx-4">
            <img className="w-full h-auto" src={logo.src} alt={logo.alt} />
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
