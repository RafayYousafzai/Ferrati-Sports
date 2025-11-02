"use client";
import React from "react";
import Header from "@/components/custom-ui/header";

const scenarios = [
  {
    image:
      "https://images.unsplash.com/photo-1556745753-b2904692b3cd?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000",
    title: "Premium Quality Materials",
    subtitle: "that stand the test of time",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000",
    title: "Fast & Reliable Delivery",
    subtitle: "your products in just 30 days",
    gradient: "from-green-500/20 to-teal-500/20",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000",
    title: "Expert Design Support",
    subtitle: "from concept to production",
    gradient: "from-orange-500/20 to-pink-500/20",
  },
];

const PictureThisSection = () => {
  return (
    <div className="pb-16 sm:pb-20 lg:pb-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Header
          title="Why Choose "
          highlightedTitle="Ferrati Sports"
          subtitle="We deliver excellence in every aspect of sportswear manufacturing, making your brand vision a reality."
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
            Join hundreds of successful brands that trust us.{" "}
            <span className="font-bold text-orange-600 dark:text-blue-400">
              Start your journey to excellence today.
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
