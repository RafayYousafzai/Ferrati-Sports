"use client";
import React from "react";
import Header from "@/components/custom-ui/header";

const scenarios = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1661476126478-a43171605fe5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    title: "You've spent months searching",
    subtitle: "for reliable manufacturers",
    description:
      "Countless emails, unreliable suppliers, inconsistent quality, and missed deadlines. You're tired of the runaround.",
    tag: "The Struggle",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1661767467261-4a4bed92a507?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
    title: "Maybe you've even tried",
    subtitle: "a few manufacturers",
    description:
      "But faced poor communication, quality issues, or minimum orders that broke your budget. You're stuck in analysis paralysis.",
    tag: "The Frustration",
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
    title: "But imagine launching",
    subtitle: "your brand with confidence",
    description:
      "High-quality products, on-time delivery, and a partner who understands your vision. That's the Ferrati difference.",
    tag: "The Solution",
    gradient: "from-green-500/20 to-blue-500/20",
  },
];

const PictureThisSection = () => {
  return (
    <div className="pb-16 sm:pb-20 lg:pb-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Header
          title="Picture "
          highlightedTitle="This"
          subtitle="We understand your journey because we've helped hundreds of brands overcome these exact challenges."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg "
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${scenario.gradient} opacity-0  `}
                />
                <img
                  src={scenario.image}
                  alt={scenario.title}
                  className="w-full h-full aspect-square object-cover "
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3 text-center">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                  {scenario.title}{" "}
                  <span className="block text-orange-500 dark:text-blue-400 mt-1">
                    {scenario.subtitle}
                  </span>
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Stop struggling with unreliable manufacturers.{" "}
            <span className="font-bold text-orange-600 dark:text-blue-400">
              Start building your brand the right way.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/request-quote"
              className="px-8 py-4 bg-orange-500 dark:bg-blue-500 text-white hover:bg-orange-600 dark:hover:bg-blue-600 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Get Your Free Quote
            </a>
            <a
              href="/services/free-clothing-samples"
              className="px-8 py-4 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Request Sample Kit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureThisSection;
