"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Badge from "./Badge";
import Separator from "./Separator";
import Image from "next/image";
import { Button } from "@heroui/button";

const data = [
  {
    imgSrc: "https://ferratisports.com/items/attimgs/0g9o6x2i7k.jpg",

    title: "Active Wear",
    description:
      "Our expert activewear manufacturing blends innovation and performance. Using stretchable, quick-dry fabrics and seamless construction, we help brands offer functional, stylish fitness apparel that stands up to the toughest demands.",
  },
  {
    imgSrc: "https://ferratisports.com/items/attimgs/5f2g0f2r2h.jpg",

    title: "Casual Wear",
    description:
      "We produce high-quality casual wear that combines comfort and style with unmatched consistency. From tees to hoodies, our efficient manufacturing process supports your brand’s growth with on-time delivery and superior fabric standards trusted worldwide.",
  },
  {
    imgSrc: "https://ferratisports.com/items/attimgs/8o1k4v0m0x.jpg",

    title: "Motorbike Gear",
    description:
      "Safety meets quality in our motorbike gear manufacturing. We deliver certified, durable jackets, gloves, and Jeans with precision engineering—trusted by brands and wholesalers who prioritize rider protection and premium craftsmanship.",
  },
  {
    imgSrc: "https://ferratisports.com/items/attimgs/8a0c8o3a7f.jpg",

    title: "Sports Wear",
    description:
      "Trusted by global brands, we deliver premium sportswear manufacturing with advanced fabrics and precision craftsmanship. Our scalable production ensures consistent quality in moisture-wicking, durable sports apparel—perfect for retailers.",
  },
];

const About = () => {
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
    <section className="overflow-hidden bg-black ">
      <div ref={scrollTriggerRef}>
        <div
          ref={scrollableSectionRef}
          className="h-screen w-[300vw] flex relative"
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="w-screen h-screen flex flex-col justify-center items-center relative"
            >
              <div className="container mx-auto">
                <div className="flex gap-[30px] relative">
                  {/* text */}
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <Badge containerStyles="w-[180px] h-[180px]" />
                    <div className="max-w-[560px] text-center">
                      {/* title */}
                      <h2 className="h2 text-white mb-4">
                        <span className="mr-4">{item.title.split(" ")[0]}</span>
                        <span className="text-accent">
                          {item.title.split(" ")[1]}
                        </span>
                      </h2>
                      {/* separator */}
                      <div className="mb-8">
                        <Separator />
                      </div>
                      {/* description */}
                      <p className="leading-relaxed text-white mb-6 px-2 md:px-8 xl:px-2s">
                        {item.description}
                      </p>
                      {/* btn */}
                      <Button className="  text-white bg-[#d74913]">
                        See more
                      </Button>
                    </div>
                  </div>
                  {/* image */}
                  <div className="hidden xl:flex flex-1 w-full h-[70vh] relative">
                    <Image
                      src={item.imgSrc}
                      fill
                      className="object-cover"
                      quality={100}
                      priority
                      alt={item.title}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
