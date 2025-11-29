import { Suspense } from "react";
import dynamic from "next/dynamic";
import FerratiAccordion from "@/components/layout/accordian";

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
import { getCachedCategories } from "@/lib/supabase/cached-queries";
import Problem from "@/components/Problem/Problem";
import AllProductsSummary from "@/components/layout/all-products-summary";
import ReviewsShowcase from "@/components/layout/reviews-showcase";
import Process from "@/components/layout/process";
import PictureThisSection from "@/components/layout/picture-this-section";

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
  const categories = await getCachedCategories(6);
  return categories ? <CategoriesCarousal categories={categories} /> : null;
}

import { getAllContentBlocks } from "@/lib/content";

// 🔹 Main page
export default async function Home() {
  const contentMap = await getAllContentBlocks();

  return (
    <>
      {/* 🎯 HERO SECTION - Hook them immediately with value proposition */}
      <Hero contentMap={contentMap} />

      {/* 😣 PROBLEM SECTION - Agitate their pain points & show understanding */}
      <Problem contentMap={contentMap} />

      {/* 🤝 GUIDE SECTION - Position yourself as the expert guide */}
      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        {/* <GuideSection contentMap={contentMap} /> */}
      </Suspense>

      {/* 🧭 PLAN SECTION - Show the simple 3-step path (includes CTA) */}
      <Process contentMap={contentMap} />
      {/* 🏷️ CATEGORIES - Show what you can manufacture */}
      <Suspense
        fallback={<div className="h-32 animate-pulse bg-gray-200 rounded" />}
      >
        <div className="hidden md:block">
          <CategoriesSection />
        </div>
        <div className="md:hidden block">
          <AllProductsSummary fetchAll={true} order={["categories"]} />
        </div>
      </Suspense>
      {/* 🎨 PICTURE THIS SECTION - Visual storytelling of transformation */}
      <PictureThisSection />
      {/* <UrgencySection /> */}

      {/* 📦 PRODUCTS OVERVIEW - Detailed offerings showcase */}
      <AllProductsSummary order={["fabrics", "services"]} />

      {/* ⭐ SOCIAL PROOF - Validate with reviews EARLY in the journey */}
      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <ReviewsShowcase />
      </Suspense>

      <br />
      <br />
      <br />

      {/* � FAQ SECTION - Calculator version for home page */}
      <FerratiAccordion calculator={false} />

      <ProductDetails
        buttonText={"Calculate Now"}
        description={[
          "Easily estimate your project cost in just a few clicks. Our calculator helps you plan your budget, compare options, and get clarity before you start.",
        ]}
        headline={"Get an instant estimate for your project."}
        href={"/calculate-price"}
        image={"/assets/photo-calculator.webp"}
        reversed={true}
        variant={"orange"}
      />
    </>
  );
}

/* 💪 WHY CHOOSE US - Reinforce your differentiation */
/*   <SectionHeader
        badge="Ferrati"
        title="Why "
        highlightedTitle="Choose Us"
        subtitle="Discover the unparalleled advantages that make us the ideal partner for bringing your brand's vision to life."
      /> */
/*  <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <ServiceCards cards={whyCards} />
      </Suspense> */
/* 🧠 PHILOSOPHY SECTION - Deepen trust with your values */
/*   <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <PhilosophySection />
      </Suspense> */
/* �📞 FINAL CTA SECTION - Strong close with clear action */

/*  <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <FinalCTASection />
      </Suspense> */
