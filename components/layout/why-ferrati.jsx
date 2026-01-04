"use client";
import { Star } from "lucide-react";
import Link from "next/link";

export default function WhyFerrati() {
  // B2B & International Manufacturing specific selling points
  const benefits = [
    "Factory-Direct Wholesale Pricing",
    "Weekly Production Updates",
    "Low MOQ for Custom Orders",
    "Free 3D Mockups & Design Support",
    "Premium Performance Fabrics",
    "Replacement Policy For Defects",
  ];

  return (
    <section className="w-full py-6 px-6 bg-white rounded-xl">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Why <span className="text-orange-500">Ferrati Sports?</span>
        </h2>

        {/* 2-Column Grid for Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-6 mb-10">
          {benefits.map((point, index) => (
            <div key={index} className="flex items-center gap-3">
              {/* Custom Bullet Point */}
              <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
              <p className="text-black font-medium text-[21px]">{point}</p>
            </div>
          ))}
        </div>

        {/* Trust/Review Footer */}
        <div className="flex flex-wrap items-center gap-2 text-lg font-medium text-black border-t border-gray-200/60 pt-6">
          <span>Trusted by 200+ global brands</span>
          <span className="text-2xl">🤝</span>
          <span>love us!</span>

          <div className="flex items-center gap-1 mx-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 fill-orange-500 text-orange-500" // Reddish star color like image
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
