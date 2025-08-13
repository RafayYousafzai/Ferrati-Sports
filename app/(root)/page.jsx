import { Suspense } from "react";
import dynamic from "next/dynamic";

import CounterSection from "@/components/layout/counter-section";
import Hero from "@/components/layout/hero";
import Header from "@/components/custom-ui/header";
import Card from "@/components/custom-ui/card";
import {
  getCachedFabrics,
  getCachedBlogs,
  getCachedCategories,
} from "@/lib/supabase/cached-queries";
import { WhyChooseUsCards, materials, sampleVideos } from "@/lib/constants";
import Explore from "@/components/Explore/Explore";

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
const Testimonials = lazyLoad(() => import("@/components/layout/testimonials"));

// 🔹 Generic grid skeleton
function GridSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-64 animate-pulse bg-gray-200 rounded" />
      ))}
    </div>
  );
}

// 🔹 Data sections
async function FabricsSection() {
  const relatedFabrics = await getCachedFabrics();
  return (
    <>
      <SectionHeader
        badge="Ferrati"
        title="Explore our "
        highlightedTitle="Fabrics"
        subtitle="Discover our premium materials tailored for your needs."
      />
      <ItemsGrid items={relatedFabrics} basePath="/fabrics" />
    </>
  );
}

async function BlogsSection() {
  const blogs = await getCachedBlogs();
  return (
    <>
      <SectionHeader
        badge="Ferrati"
        title="Check Our Latest"
        highlightedTitle=" Blogs"
        subtitle="Insights, trends, and stories from the world of apparel manufacturing."
      />
      <ItemsGrid items={blogs} basePath="/blogs" />
    </>
  );
}

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

// 🔹 Reusable grid for items
function ItemsGrid({ items, basePath }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
      {items?.map((item) => (
        <Card
          key={item.id}
          href={`${basePath}/${item.id}`}
          image={item.image_url}
          title={item.title}
        >
          <div
            className="text-sm text-default-500 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </Card>
      ))}
    </div>
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

      <div className="px-2">
        <SectionHeader
          badge="Ferrati"
          title="We are the alternative to  "
          highlightedTitle="traditional manufacturing"
          subtitle="We break from outdated methods, delivering custom solutions with speed and flexibility—bringing your vision to life exactly as you imagine it."
        />
      </div>
      <Explore />

      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <ProductDetails
          buttonText="Request Quote"
          description={[
            "Looking for a team that brings your digital ideas to life? From strategy to execution, we deliver tailored solutions that meet your business needs with precision and creativity.",
          ]}
          headline="Request Quote to Build Your Digital Future"
          href="/request-quote"
          image="/assets/workers.png"
          reversed
          sectionTitle="WORK WITH US"
          variant="white"
        />
      </Suspense>

      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <Solutions cards={materials} />
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

      <Suspense fallback={<GridSkeleton />}>
        <FabricsSection />
      </Suspense>

      <Suspense fallback={<GridSkeleton />}>
        <BlogsSection />
      </Suspense>

      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <Testimonials />
      </Suspense>
    </>
  );
}
