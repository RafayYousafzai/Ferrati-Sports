import { Suspense } from "react";
import Card from "@/components/custom-ui/card";
import Header from "@/components/custom-ui/header";
import {
  getCachedFabrics,
  getCachedBlogs,
  getCachedCategories,
} from "@/lib/supabase/cached-queries";

// 🔹 Section definitions (dynamic mapping)
const sectionComponents = {
  categories: async function CategoriesSection() {
    const categories = await getCachedCategories();
    return (
      <>
        <SectionHeader
          badge="Ferrati"
          title="Browse Our"
          highlightedTitle=" Categories"
          subtitle="Find the perfect fit for your apparel needs."
        />
        <ItemsGrid items={categories} basePath="/categories" />
      </>
    );
  },
  fabrics: async function FabricsSection() {
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
  },
  blogs: async function BlogsSection() {
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
  },
};

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

// 🔹 Skeleton placeholder
function GridSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-64 animate-pulse bg-gray-200 rounded" />
      ))}
    </div>
  );
}

// 🔹 Main component — pass sections in any order
export default async function AllProductsSummary({
  order = ["categories", "fabrics", "blogs"],
}) {
  return (
    <div>
      {order.map((sectionKey) => {
        const Section = sectionComponents[sectionKey];
        if (!Section) return null; // Skip unknown keys

        return (
          <Suspense key={sectionKey} fallback={<GridSkeleton />}>
            {/* Invoke the async section component */}
            <Section />
          </Suspense>
        );
      })}
    </div>
  );
}
