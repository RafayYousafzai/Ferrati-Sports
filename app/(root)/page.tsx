import { cookies } from "next/headers";
import { Suspense } from "react";
import dynamic from "next/dynamic";

import CounterSection from "@/components/layout/counter-section";
import Hero from "@/components/layout/hero";
import Header from "@/components/custom-ui/header";
import { createClient } from "@/lib/supabase/server";
import Card from "@/components/custom-ui/card";
import {
  getCachedFabrics,
  getCachedBlogs,
  getCachedCategories,
} from "@/lib/supabase/cached-queries";

// Lazy load components that are below the fold
const CategoriesCarousal = dynamic(
  () => import("@/components/layout/categories-carousal"),
  {
    loading: () => <div className="h-32 animate-pulse bg-gray-200 rounded" />,
  }
);

const ServiceCards = dynamic(() => import("@/components/service-cards"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200 rounded" />,
});

const Solutions = dynamic(() => import("@/components/layout/solutions"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200 rounded" />,
});

const VideoShowcase = dynamic(
  () => import("@/components/layout/video-showcase"),
  {
    loading: () => <div className="h-64 animate-pulse bg-gray-200 rounded" />,
  }
);

const ProductDetails = dynamic(
  () => import("@/components/layout/product-details"),
  {
    loading: () => <div className="h-64 animate-pulse bg-gray-200 rounded" />,
  }
);

const Testimonials = dynamic(() => import("@/components/layout/testimonials"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200 rounded" />,
});

// Move static data to separate file or constants
import { WhyChooseUsCards, materials, sampleVideos } from "@/lib/constants";

// Loading components for Suspense boundaries
function FabricsLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-64 animate-pulse bg-gray-200 rounded" />
      ))}
    </div>
  );
}

function BlogsLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-64 animate-pulse bg-gray-200 rounded" />
      ))}
    </div>
  );
}

// Separate components for data fetching
async function FabricsSection() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const relatedFabrics = await getCachedFabrics();

  return (
    <>
      <Header
        badge="Ferrati"
        highlightedTitle="Fabrics"
        subtitle="Discover our premium materials tailored for your needs."
        title="Explore our "
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
        {relatedFabrics?.map((item) => (
          <div key={item.id}>
            <Card
              description={undefined}
              href={`/fabrics/${item.id}`}
              image={item.image_url}
              title={item.title}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: item.description,
                }}
                className="text-sm text-default-500 line-clamp-3"
              />
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

async function BlogsSection() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const blogs = await getCachedBlogs();

  return (
    <>
      <Header
        badge="Ferrati"
        highlightedTitle=" Blogs"
        subtitle="Insights, trends, and stories from the world of apparel manufacturing."
        title="Check Our Latest"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
        {blogs?.map((item) => (
          <div key={item.id}>
            <Card
              description={undefined}
              href={`/blogs/${item.id}`}
              image={item.image_url}
              title={item.title}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: item.description,
                }}
                className="text-sm text-default-500 line-clamp-3"
              />
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

async function CategoriesSection() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const categories = await getCachedCategories();

  return <CategoriesCarousal categories={categories} />;
}

export default async function Home() {
  return (
    <>
      {/* Above the fold content - loads immediately */}
      <Hero />
      <CounterSection />

      <Header
        badge="Ferrati"
        highlightedTitle="Choose Us"
        subtitle="Discover the unparalleled advantages that make us the ideal partner for bringing your brand's vision to life."
        title="Why "
      />

      {/* Below the fold content - lazy loaded */}
      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <ServiceCards cards={WhyChooseUsCards as any} />
      </Suspense>

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
          reversed={true}
          sectionTitle="WORK WITH US"
          variant="white"
        />
      </Suspense>

      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <Solutions cards={materials as any} />
      </Suspense>

      <Header
        badge="OUR APPROACH"
        highlightedTitle="Our Work"
        subtitle="See our craftsmanship in action — a showcase of projects that reflect our commitment to quality, innovation, and trusted partnerships."
        title="Where Quality Speaks"
      />

      <Suspense
        fallback={<div className="h-64 animate-pulse bg-gray-200 rounded" />}
      >
        <VideoShowcase videos={sampleVideos} />
      </Suspense>

      <br />
      <br />

      <Suspense
        fallback={<div className="h-32 animate-pulse bg-gray-200 rounded" />}
      >
        <CategoriesSection />
      </Suspense>

      <Suspense fallback={<FabricsLoading />}>
        <FabricsSection />
      </Suspense>

      <Suspense fallback={<BlogsLoading />}>
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
