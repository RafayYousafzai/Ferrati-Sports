import { Suspense } from "react";
import dynamic from "next/dynamic";

import CounterSection from "@/components/layout/counter-section";
import Hero from "@/components/layout/hero";
import Header from "@/components/custom-ui/header";
import { getCachedCategories } from "@/lib/supabase/cached-queries";
import { WhyChooseUsCards, process, sampleVideos } from "@/lib/constants";
import Explore from "@/components/Explore/Explore";
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
  return (
    <>
      {/* Above the fold */}
      <Hero />
      <CounterSection />

      <SectionHeader
        badge="Ferrati"
        title="Why "
        highlightedTitle="Choose Us"
        subtitle="Discover the unparalleled advantages that make us the ideal partner for bringing your brand's vision to life."
      />

      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <ServiceCards cards={WhyChooseUsCards} />
      </Suspense>

      <Explore />

      {/* <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <ProductDetails
          buttonText="Request Quote"
          description={[
            "Looking for a team that brings your digital ideas to life? From strategy to execution, we deliver tailored solutions that meet your business needs with precision and creativity.",
          ]}
          headline="Request Quote to Build Your Digital Future"
          href="/request-quote"
          image="/assets/workers.webp"
          reversed
          sectionTitle="WORK WITH US"
          variant="white"
        />
      </Suspense> */}

      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <Solutions cards={process} />
      </Suspense>

      <SectionHeader
        badge="OUR APPROACH"
        title="Where Quality Speaks"
        highlightedTitle="Our Work"
        subtitle="See our craftsmanship in action — a showcase of projects that reflect our commitment to quality, innovation, and trusted partnerships."
      />
      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <VideoShowcase videos={sampleVideos} />
      </Suspense>

      <Suspense
        fallback={<div className="h-32 animate-pulse bg-gray-200 rounded" />}
      >
        <CategoriesSection />
      </Suspense>

      <AllProductsSummary order={["fabrics", "blogs"]} />

      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <ReviewsShowcase />
      </Suspense>
    </>
  );
}
