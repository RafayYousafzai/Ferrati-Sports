"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Button } from "@heroui/button";

import Badge from "../badge";
import Separator from "../separator";
import Card from "../custom-ui/card";
import Header from "../custom-ui/header";
import Link from "next/link";
import { Image } from "@heroui/image";

const CategoriesCarousal = ({ categories }: { categories: any }) => {
  const scrollableSectionRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animation = gsap.fromTo(
      scrollableSectionRef.current,
      { translateX: 0 },
      {
        translateX: "-200vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: scrollTriggerRef.current,
          start: "top top",
          end: "1800vw top",
          scrub: 0.6,
          pin: true,
        },
      }
    );

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section className="overflow-hidden ">
      <div className="hidden md:block  bg-black">
        <div ref={scrollTriggerRef}>
          <div
            ref={scrollableSectionRef}
            className="h-screen w-[300vw] flex relative"
          >
            {categories.map((item: any, index: any) => (
              <div
                key={index}
                className="w-screen h-screen flex flex-col justify-center items-center relative"
              >
                <div className="container mx-auto">
                  <div className="flex gap-[30px] relative">
                    {/* text */}
                    <div className="flex-1 flex flex-col justify-center items-center space-y-6">
                      {/* Badge with animation */}
                      <div className="transform transition-all duration-700 hover:scale-105 hover:rotate-3">
                        <Badge containerStyles="w-[180px] h-[180px]" />
                      </div>

                      <div className="max-w-[560px] text-center animate-fadeInUp">
                        {/* Title */}
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                          <span className="mr-2">
                            {item.title.split(" ")[0]}
                          </span>
                          <span className="text-accent">
                            {item.title.split(" ")[1]}
                          </span>
                        </h2>

                        {/* Separator */}
                        <div className="flex justify-center mb-6">
                          <Separator className="w-24  border-accent" />
                        </div>

                        {/* Description */}
                        <p className="leading-relaxed text-gray-200 mb-8 px-4 md:px-8 text-lg">
                          {item.description}
                        </p>

                        {/* Button */}
                        <Link href={`/categories/${item.id}`}>
                          <Button
                            size="lg"
                            className="bg-orange-500 text-white hover:scale-105 transition-transform duration-300 ease-in-out"
                          >
                            See more
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* image */}
                    <div className="hidden xl:flex flex-1 w-full h-[70vh] relative">
                      <Image
                        isZoomed
                        isBlurred
                        alt={item.title}
                        className="object-cover"
                        className="w-full h-full object-cover rounded-2xl"
                        width={600}
                        height={600}
                        src={item.image_url}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:hidden block bg-white">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
          <Header
            badge="Ferrati"
            highlightedTitle="Categories"
            title="Our "
            subtitle="We Believe In Building trust through unparalleled quality and genuine partnerships, allowing our exceptional work to speak for itself."
          />
          {categories.map((item: any, index: any) => (
            <Card
              key={index}
              description={item.description}
              image={item.image_url}
              title={item.title}
              href={`/categories/${item.id}`}
            >
              <></>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesCarousal;
