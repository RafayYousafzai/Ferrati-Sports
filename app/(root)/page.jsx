import { Suspense } from "react";
import dynamic from "next/dynamic";

import CounterSection from "@/components/layout/counter-section";

export const metadata = {
  title: "Ferrati Sports - Premium Custom Clothing & Sportswear Manufacturing",
  description:
    "Leading manufacturer of custom clothing, sportswear, and premium apparel. From design to production, we create high-quality garments for brands worldwide. Get your custom quote today.",
  keywords:
    "custom clothing, sportswear manufacturing, premium apparel, custom sportswear, clothing manufacturer, brand manufacturing, custom garments",
  openGraph: {
    title: "Ferrati Sports - Premium Custom Clothing Manufacturing",
    description:
      "Leading manufacturer of custom clothing and sportswear. High-quality garments for brands worldwide.",
    type: "website",
    url: "https://ferrati-sports.com",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Ferrati Sports Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferrati Sports - Premium Custom Clothing Manufacturing",
    description:
      "Leading manufacturer of custom clothing and sportswear. High-quality garments for brands worldwide.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
import Hero from "@/components/layout/hero";
import Header from "@/components/custom-ui/header";
import { getCachedCategories } from "@/lib/supabase/cached-queries";
import Explore from "@/components/Explore/Explore";
import {
  getCachedExploreItems,
  getCachedWhyChooseUs,
  getCachedProcessSteps,
} from "@/lib/supabase/cached-content";
import AllProductsSummary from "@/components/layout/all-products-summary";
import ReviewsShowcase from "@/components/layout/reviews-showcase";

// 🔹 Helper to lazy-load components with a standard skeleton
const lazyLoad = (importFn, height = "h-64") =>
  dynamic(importFn, {
    loading: () => (
      <div className={`${height} animate-pulse bg-gray-200 rounded`} />
    ),
  });

const CategoriesCarousal = lazyLoad(
  () => import("@/components/layout/categories-carousal"),
  "h-32"
);
const ServiceCards = lazyLoad(() => import("@/components/service-cards"));
const Solutions = lazyLoad(() => import("@/components/layout/solutions"));
const VideoShowcase = lazyLoad(
  () => import("@/components/layout/video-showcase")
);
const ProductDetails = lazyLoad(
  () => import("@/components/layout/product-details")
);

async function CategoriesSection() {
  const categories = await getCachedCategories();
  return categories ? <CategoriesCarousal categories={categories} /> : null;
}

// 🔹 Reusable header component
function SectionHeader({ badge, title, highlightedTitle, subtitle }) {
  return (
    <Header
      badge={badge}
      title={title}
      highlightedTitle={highlightedTitle}
      subtitle={subtitle}
    />
  );
}

// 🔹 Main page
export default async function Home() {
  const [exploreItems, whyCards, steps] = await Promise.all([
    getCachedExploreItems(),
    getCachedWhyChooseUs(),
    getCachedProcessSteps(),
  ]);
  const problemItems = exploreItems.filter((i) => i.type === "problem");
  const solutionItems = exploreItems.filter((i) => i.type === "solution");
  return (
    <>
      {/* Above the fold */}
      <Hero />
      <CounterSection />

      <Explore problemItems={problemItems} solutionItems={solutionItems} />

      <SectionHeader
        badge="Ferrati"
        title="Why "
        highlightedTitle="Choose Us"
        subtitle="Discover the unparalleled advantages that make us the ideal partner for bringing your brand's vision to life."
      />
      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <ServiceCards cards={whyCards} />
      </Suspense>

      <br />

      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <Solutions cards={steps} />
      </Suspense>

      {/* <SectionHeader
        badge="OUR APPROACH"
        title="Where Quality Speaks"
        highlightedTitle="Our Work"
        subtitle="See our craftsmanship in action — a showcase of projects that reflect our commitment to quality, innovation, and trusted partnerships."
      />
      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <VideoShowcase videos={sampleVideos} />
      </Suspense> */}

      <Suspense
        fallback={<div className="h-32 animate-pulse bg-gray-200 rounded" />}
      >
        <CategoriesSection />
      </Suspense>

      <AllProductsSummary order={["fabrics", "services"]} />

      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <ReviewsShowcase />
      </Suspense>
    </>
  );
}
