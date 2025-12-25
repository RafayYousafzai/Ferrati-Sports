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

import { Star } from "lucide-react";
import { Avatar } from "@heroui/avatar";

import Header from "../custom-ui/header";
import { Card } from "@/components/ui/card";

const reviews = [
  {
    id: 1,
    name: "Emily Carter",
    date: "March 14, 2025",
    rating: 5,
    title: "Premium Quality Fabrics",
    content:
      "Ferrati Sports delivered top-notch apparel that truly reflects our brand’s identity. The durability and quality are unmatched.",
    platform: "Google",
  },
  {
    id: 2,
    name: "James Patel",
    date: "July 22, 2025",
    rating: 5,
    title: "Outstanding Customization",
    content:
      "The fabric printing and customization were flawless. They captured our designs perfectly and brought them to life with precision.",
    platform: "Google",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    date: "Jan 30, 2025",
    rating: 5,
    title: "Excellent Service",
    content:
      "From consultation to delivery, the team was professional and reliable. Our uniforms turned out stylish and long-lasting.",
    platform: "Google",
  },
  {
    id: 4,
    name: "Daniel Kim",
    date: "Sep 18, 2025",
    rating: 5,
    title: "Perfect for Branding",
    content:
      "The garments not only look premium but also strengthen our brand presence. Truly a partner who understands business needs.",
    platform: "Google",
  },
  {
    id: 5,
    name: "Hannah Wilson",
    date: "May 05, 2025",
    rating: 5,
    title: "Highly Recommended",
    content:
      "We’ve worked with several suppliers, but Ferrati Sports stands out. Quality, professionalism, and attention to detail are exceptional.",
    platform: "Google",
  },
  {
    id: 6,
    name: "Omar Sheikh",
    date: "Nov 27, 2025",
    rating: 5,
    title: "Reliable & Creative",
    content:
      "They combined creativity with quality manufacturing. The final products exceeded expectations and our clients loved them.",
    platform: "Google",
  },
];

export default function ReviewsShowcase() {
  return (
    <div className="w-full relative">
      <Header
        highlightedTitle="Brands Worldwide"
        subtitle="See what our partners say about our premium apparel, custom printing, and commitment to quality."
        title="Trusted by"
      />

      <Swiper
        autoplay={{
          delay: 3000, // Faster auto-scroll
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        centeredSlides={true} // Centers active slide on mobile
        breakpoints={{
          640: {
            centeredSlides: false, // Standard flow on desktop
          },
        }}
        className="pb-10 pt-4 !px-4 sm:!px-0" // Added padding handling
        freeMode={{
          enabled: true,
          sticky: false,
          momentumRatio: 0.5, // Increased for faster sliding feel
          momentumVelocityRatio: 0.5,
        }}
        grabCursor={true}
        loop={true}
        modules={[FreeMode, Mousewheel, Autoplay, EffectCoverflow]}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1, // Increased sensitivity
          releaseOnEdges: true,
        }}
        slidesPerView="auto"
        spaceBetween={20}
        speed={600} // Snappier transition speed
      >
        {reviews.map((review) => (
          // Mobile: w-[90vw] for full width feel. Desktop: fixed width
          <SwiperSlide key={review.id} className="!w-[90vw] sm:!w-96">
            <Card className="h-full min-h-[320px] p-6 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-orange-100 flex flex-col justify-between">
              {/* Top Section: Rating & Title */}
              <div>
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-orange-500 text-orange-500"
                    />
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {review.title}
                </h3>

                <p className="text-gray-600 text-[15px] leading-relaxed">
                  "{review.content}"
                </p>
              </div>

              {/* Bottom Section: Avatar & Info */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-50">
                <Avatar
                  name={review.name}
                  className="w-10 h-10 border border-gray-200"
                  src={`https://xsgames.co/randomusers/assets/avatars/${
                    review.id % 2 === 0 ? "male" : "female"
                  }/${Math.floor(review.id / 2)}.jpg`}
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {review.name}
                  </p>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    {review.date} •{" "}
                    <span className="text-green-600 font-medium">
                      Verified Client
                    </span>
                  </p>
                </div>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
