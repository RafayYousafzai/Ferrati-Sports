"use client";

import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { IconComponents } from "@tabler/icons-react";

import Header from "../custom-ui/header";

import { Card, CardContent } from "@/components/ui/card";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 py-20 px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full transform translate-x-48 -translate-y-48"
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400 rounded-full transform -translate-x-40 translate-y-40"
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
            scale: [1, 1.05, 1],
          }}
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-orange-300 rounded-full transform -translate-y-32"
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-full mx-auto">
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Header
            badge="PROCESS"
            highlightedTitle="Manufacturing."
            subtitle="From concept to delivery, we transform your ideas into high-quality custom apparel through our streamlined 6-step process, backed by expertise and state-of-the-art facilities."
            theme="dark"
            title="Our streamlined "
          />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          className="relative"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Swiper
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
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
            className="!pb-12"
            freeMode={{
              enabled: true,
              momentum: true,
              momentumRatio: 0.25,
              momentumVelocityRatio: 0.25,
            }}
            grabCursor={true}
            longSwipesRatio={0.1}
            modules={[FreeMode, Mousewheel, Autoplay, Pagination]}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.1,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-white/30 !w-2 !h-2",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-white !scale-125",
            }}
            slidesPerView="auto"
            spaceBetween={24}
            threshold={10}
            touchAngle={45}
            touchRatio={1.5}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={card.id} className="!h-auto">
                <motion.div
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }
                      : {
                          opacity: 0,
                          y: 60,
                          scale: 0.9,
                        }
                  }
                  className="h-full"
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="bg-white border-0 shadow-lg h-full rounded-none transition-all duration-500 hover:shadow-2xl group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-100/0 group-hover:from-orange-50/30 group-hover:to-orange-100/20 transition-all duration-500" />

                    <CardContent className="p-8 relative z-10">
                      <motion.div
                        className="mb-6"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="relative inline-block">
                          <motion.div
                            className="absolute -top-2 -left-2 w-8 h-8 bg-orange-500 rounded-sm"
                            whileHover={{
                              scale: 1.2,
                              rotate: 45,
                              transition: { duration: 0.3 },
                            }}
                          />
                          <motion.div
                            className="relative bg-white p-2 shadow-sm"
                            whileHover={{
                              rotate: -5,
                              transition: { duration: 0.3 },
                            }}
                          >
                            <motion.div
                              whileHover={{
                                rotate: 360,
                                transition: {
                                  duration: 0.6,
                                  ease: "easeInOut",
                                },
                              }}
                            >
                              <IconComponents
                                className="w-8 h-8 text-gray-700 transition-colors duration-300 group-hover:text-orange-600"
                                strokeWidth={1.5}
                              />
                            </motion.div>
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.h3
                        className="text-xl font-bold text-gray-900 mb-6 group-hover:text-orange-700 transition-colors duration-300"
                        transition={{ duration: 0.2 }}
                        whileHover={{ x: 5 }}
                      >
                        {card.title}
                      </motion.h3>

                      <ul className="space-y-3">
                        {card.services.map((service, serviceIndex) => (
                          <motion.li
                            key={serviceIndex}
                            animate={
                              isInView
                                ? {
                                    opacity: 1,
                                    x: 0,
                                  }
                                : {
                                    opacity: 0,
                                    x: -20,
                                  }
                            }
                            className="flex items-center text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.1 + serviceIndex * 0.05 + 0.5,
                            }}
                            whileHover={{
                              x: 8,
                              transition: { duration: 0.2 },
                            }}
                          >
                            <motion.div
                              whileHover={{
                                rotate: 90,
                                scale: 1.2,
                                transition: { duration: 0.2 },
                              }}
                            >
                              <ChevronRight className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0 transition-colors duration-300 group-hover:text-orange-600" />
                            </motion.div>
                            <span className="transition-all duration-300">
                              {service.name}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
