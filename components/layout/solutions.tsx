"use client";

import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import Header from "../custom-ui/header";

import { Card, CardContent } from "@/components/ui/card";
import { IconComponents } from "@tabler/icons-react";

interface ServiceItem {
  name: string;
}

interface SolutionCard {
  id: string;
  title: string;
  icon: "analytics" | "earned" | "paid" | "creative";
  services: ServiceItem[];
  href?: string;
}

interface SolutionsProps {
  cards: SolutionCard[];
}

export default function Solutions({ cards }: SolutionsProps) {
  return (
    <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 py-20 px-8 overflow-hidden">
      {/* Background geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full transform translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400 rounded-full transform -translate-x-40 translate-y-40" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-orange-300 rounded-full transform -translate-y-32" />
      </div>

      <div className="relative max-w-full mx-auto">
        <Header
          badge="PROCESS"
          highlightedTitle="Manufacturing."
          subtitle="From concept to delivery, we transform your ideas into high-quality custom apparel through our streamlined 6-step process, backed by expertise and state-of-the-art facilities."
          theme="dark"
          title="Our streamlined "
        />

        {/* Cards Grid */}
        <div className="relative">
          <Swiper
            modules={[FreeMode, Mousewheel, Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView="auto"
            freeMode={{
              enabled: true,
              momentum: true,
              momentumRatio: 0.25,
              momentumVelocityRatio: 0.25,
            }}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.1,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-white/30 !w-2 !h-2",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-white !scale-125",
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            grabCursor={true}
            touchRatio={1.5}
            touchAngle={45}
            threshold={10}
            longSwipesRatio={0.1}
            className="!pb-12 "
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id} className="!h-auto">
                <Card className="bg-white border-0 shadow-lg h-full rounded-none hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="p-8">
                    {/* Icon with orange accent */}
                    <div className="mb-6">
                      <div className="relative inline-block">
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-orange-500 rounded-sm" />
                        <div className="relative bg-white p-2">
                          <IconComponents
                            className="w-8 h-8 text-gray-700"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      {card.title}
                    </h3>

                    {/* Services List */}
                    <ul className="space-y-3">
                      {card.services.map((service, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-600 text-sm"
                        >
                          <ChevronRight className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0" />
                          <span>{service.name}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
