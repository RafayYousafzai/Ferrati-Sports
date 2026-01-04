"use client";
import React from "react";
import Header from "@/components/custom-ui/header";
import Link from "next/link";
import { Button } from "@heroui/button";
import Separator from "../separator";

const scenarios = [
  {
    image:
      "https://images.unsplash.com/photo-1556745753-b2904692b3cd?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000",
    title: (
      <>
        You have tried multiple{" "}
        <span className="font-extrabold  ">suppliers</span>
      </>
    ),
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000",
    title: (
      <>
        You have <span className="font-extrabold  ">tested</span> different
        factories
      </>
    ),
    gradient: "from-green-500/20 to-teal-500/20",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000",
    title: (
      <>
        But your brand is not <span className="font-extrabold ">scaling</span>{" "}
        the way you hoped.
      </>
    ),
    gradient: "from-orange-500/20 to-pink-500/20",
  },
];

const PictureThisSection = () => {
  return (
    <div className="pb-16 sm:pb-20 lg:pb-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* <Header
          title="Real Reason Your Brand is still behind  "
          highlightedTitle=""
          // subtitle="We deliver excellence in every aspect of sportswear manufacturing, making your brand vision a reality."
        /> */}

        <div className="mb-16 mt-20 mx-2 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-orange-500">Real Reason</span> Your Brand is
            Still Behind
          </h2>
          <span className="block mx-auto text-center text-3xl font-bold mb-6 leading-tight bg-clip-text text-orange-500">
            (It's Not What You Think)
          </span>
          <Separator bg="accent" />
        </div>

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
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight italic">
                  {typeof scenario.title === "string"
                    ? scenario.title
                    : scenario.title}
                  <span className="block text-orange-500 dark:text-blue-400 mt-1">
                    {typeof scenario.subtitle === "string"
                      ? scenario.subtitle
                      : scenario.subtitle}
                  </span>
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center ">
          {/* WHY Section with horizontal bullet list */}
          <div className="mb-6 max-w-5xl mx-auto text-center">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-orange-500 mb-4">
              Why?
            </h3>
            <ul className="flex flex-col items-start gap-2 mb-4 list-disc list-inside max-w-xl mx-auto tracking-wide text-left">
              <li className="text-lg ml-6 sm:text-m text-black">
                It is not because your designs are not good.
              </li>
              <li className="text-lg ml-6 sm:text-m text-black">
                It is not because there is “too much competition”{" "}
              </li>
              <li className="text-lg ml-6 sm:text-m text-black">
                It is not definitely because you are not working hard enough.
              </li>
            </ul>
            <div className="text-lg sm:text-l space-y-2 w-full mx-3 text-balance text-black">
              <p className="tracking-wider">
                It is because you are missing key parts of the{" "}
                <span className="font-bold">manufacturing puzzle</span>. Success
                is not just{" "}
                <span className="italic text-orange-500">
                  “finding a supplier”
                </span>
                . If that was all you needed, every brand would be scaling.
              </p>
              <p className="tracking-wider">
                Most factories focus on products but we focus on your
                <span className="font-bold"> brand’s growth</span>.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto mx-auto justify-center">
            <Link href="/request-quote" passHref>
              <Button
                disableRipple
                className="border-1 border-e-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white font-bold text-base lg:text-lg px-12 py-8 border-orange-500 tracking-wider [&]:hover:opacity-100"
                radius="full"
                size="lg"
                variant="bordered"
              >
                START FOR FREE
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureThisSection;
