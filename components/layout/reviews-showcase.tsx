"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FreeMode,
  Mousewheel,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/effect-coverflow";

import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
import Badge from "../badge";
import Header from "../custom-ui/header";
const reviews = [
  {
    id: 1,
    name: "Emily Carter",
    date: "2025-12-12",
    rating: 5,
    title: "Premium Quality Fabrics",
    content:
      "Ferrati Sports delivered top-notch apparel that truly reflects our brand’s identity. The durability and quality are unmatched.",
    platform: "Google",
  },
  {
    id: 2,
    name: "James Patel",
    date: "2025-12-10",
    rating: 5,
    title: "Outstanding Customization",
    content:
      "The fabric printing and customization were flawless. They captured our designs perfectly and brought them to life with precision.",
    platform: "Google",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    date: "2025-12-08",
    rating: 5,
    title: "Excellent Service",
    content:
      "From consultation to delivery, the team was professional and reliable. Our uniforms turned out stylish and long-lasting.",
    platform: "Google",
  },
  {
    id: 4,
    name: "Daniel Kim",
    date: "2025-12-05",
    rating: 5,
    title: "Perfect for Branding",
    content:
      "The garments not only look premium but also strengthen our brand presence. Truly a partner who understands business needs.",
    platform: "Google",
  },
  {
    id: 5,
    name: "Hannah Wilson",
    date: "2025-12-03",
    rating: 5,
    title: "Highly Recommended",
    content:
      "We’ve worked with several suppliers, but Ferrati Sports stands out. Quality, professionalism, and attention to detail are exceptional.",
    platform: "Google",
  },
  {
    id: 6,
    name: "Omar Sheikh",
    date: "2025-12-01",
    rating: 5,
    title: "Reliable & Creative",
    content:
      "They combined creativity with quality manufacturing. The final products exceeded expectations and our clients loved them.",
    platform: "Google",
  },
];

export default function ReviewsShowcase() {
  return (
    <div className="w-full">
      <Header
        title="Trusted by"
        highlightedTitle="Brands Worldwide"
        subtitle="See what our partners say about our premium apparel, custom printing, and commitment to quality."
      />

      <Swiper
        modules={[FreeMode, Mousewheel, Autoplay, EffectCoverflow]}
        spaceBetween={24}
        slidesPerView="auto"
        freeMode={{
          enabled: true,
          sticky: false,
          momentumRatio: 0.25,
          momentumVelocityRatio: 0.25,
        }}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 0.5,
          releaseOnEdges: true,
          thresholdDelta: 70,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        loop={true}
        grabCursor={true}
        centeredSlides={false}
        className="pb-6"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="!w-80 min-w-md py-6">
            <Card className="w-full p-6  h-72 shadow-none rounded-2xl group animate-fade-in border-none bg-slate-50 ">
              <div className="flex justify-between items-start ">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-yellow-400 text-yellow-400  "
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <Badge containerStyles=" -mt-4 w-[64px] h-[64px]" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 -mt-4  group-hover:text-orange-500 transition-colors duration-300">
                {review.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed   group-hover:text-gray-700 transition-colors duration-300">
                {review.content}
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <Avatar name={review.name} />
                <div className="transition-transform duration-300 group-hover:translate-x-1">
                  <p className="font-medium text-gray-900 text-sm">
                    {review.name}
                  </p>
                  <p className="text-gray-500 text-xs">{review.date}</p>
                </div>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
