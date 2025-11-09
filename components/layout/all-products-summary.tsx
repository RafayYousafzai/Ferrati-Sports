import { Suspense } from "react";

import Card from "@/components/custom-ui/card";
import Header from "@/components/custom-ui/header";
import {
  getCachedFabrics,
  getCachedBlogs,
  getCachedCategories,
  getCachedServices,
  getFabrics,
  getBlogs,
  getCategories,
  getServices,
} from "@/lib/supabase/cached-queries";

type HeadingProps = {
  title: string;
  highlightedTitle: string;
  subtitle: string;
};

type SectionProps = {
  heading?: Partial<HeadingProps>;
  fetchAll: boolean;
  fresh: boolean;
};

type Item = {
  id: string | number;
  title: string;
  description: string;
  image_url?: string;
};

type SectionFunction = (props: SectionProps) => Promise<JSX.Element>;

interface AllProductsSummaryProps {
  order?: (keyof typeof sectionComponents)[];
  headings?: Partial<
    Record<keyof typeof sectionComponents, Partial<HeadingProps>>
  >;
  fetchAll?: boolean;
  fetchAllPerSection?: Partial<Record<keyof typeof sectionComponents, boolean>>;
  fresh?: boolean;
  freshPerSection?: Partial<Record<keyof typeof sectionComponents, boolean>>;
}

// 🔹 Default headings for each section
const defaultHeadings: Record<keyof typeof sectionComponents, HeadingProps> = {
  categories: {
    title: "Browse Our",
    highlightedTitle: " Categories",
    subtitle: "Find the perfect fit for your apparel needs.",
  },
  fabrics: {
    title: "Explore our ",
    highlightedTitle: "Fabrics",
    subtitle: "Discover our premium materials tailored for your needs.",
  },
  blogs: {
    title: "Check Our Latest",
    highlightedTitle: " Blogs",
    subtitle:
      "Insights, trends, and stories from the world of apparel manufacturing.",
  },
  services: {
    title: "Explore our best ",
    highlightedTitle: " Services",
    subtitle: "Premium solutions tailored for your business.",
  },
};

// 🔹 Section definitions with overridable options
const sectionComponents: Record<string, SectionFunction> = {
  categories: async ({ heading, fetchAll, fresh }) => {
    const categories = fresh
      ? await getCategories(fetchAll ? null : 3)
      : await getCachedCategories(fetchAll ? null : 3);

    return (
      <>
        <SectionHeader
          badge="Ferrati"
          {...defaultHeadings.categories}
          {...heading}
        />
        <ItemsGrid basePath="/categories" items={categories || []} />
      </>
    );
  },
  fabrics: async ({ heading, fetchAll, fresh }) => {
    const fabrics = fresh
      ? await getFabrics(fetchAll ? null : 3)
      : await getCachedFabrics(fetchAll ? null : 3);

    return (
      <>
        <SectionHeader
          badge="Ferrati"
          {...defaultHeadings.fabrics}
          {...heading}
        />
        <ItemsGrid basePath="/fabrics" items={fabrics || []} />
      </>
    );
  },
  blogs: async ({ heading, fetchAll, fresh }) => {
    const blogs = fresh
      ? await getBlogs(fetchAll ? null : 3)
      : await getCachedBlogs(fetchAll ? null : 3);

    return (
      <>
        <SectionHeader
          badge="Ferrati"
          {...defaultHeadings.blogs}
          {...heading}
        />
        <ItemsGrid basePath="/blogs" items={blogs || []} />
      </>
    );
  },
  services: async ({ heading, fetchAll, fresh }) => {
    const services = fresh
      ? await getServices(fetchAll ? null : 3)
      : await getCachedServices(fetchAll ? null : 3);

    return (
      <>
        <SectionHeader
          badge="Ferrati"
          {...defaultHeadings.services}
          {...heading}
        />
        <ItemsGrid basePath="/services" items={services || []} />
      </>
    );
  },
};

// 🔹 Reusable header component
function SectionHeader({
  badge,
  title,
  highlightedTitle,
  subtitle,
}: { badge: string } & HeadingProps) {
  return (
    <Header
      badge={badge}
      highlightedTitle={highlightedTitle}
      subtitle={subtitle}
      title={title}
    />
  );
}

// 🔹 Reusable grid for items
function ItemsGrid({ items, basePath }: { items: Item[]; basePath: string }) {
  let isCategories = basePath === "/categories";

  console.log(basePath);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
      {items?.map((item) => (
        <Card
          key={item.id}
          href={
            !isCategories
              ? `${basePath}/${(item as any).slug || item.id} `
              : `${(item as any).slug || item.id} `
          }
          image={item.image_url}
          title={item.title}
        >
          <div
            dangerouslySetInnerHTML={{ __html: item.description }}
            className="text-sm text-default-500 line-clamp-3"
          />
        </Card>
      ))}
    </div>
  );
}

// 🔹 Skeleton placeholder
function GridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-64 animate-pulse bg-gray-200 rounded" />
      ))}
    </div>
  );
}

// 🔹 Main component — fully dynamic with custom headings and fetch control
export default async function AllProductsSummary({
  order = ["categories", "fabrics", "blogs", "services"],
  headings = {},
  fetchAll = false,
  fetchAllPerSection = {},
  fresh = false,
  freshPerSection = {},
}: AllProductsSummaryProps) {
  const results = await Promise.all(
    order.map(async (sectionKey) => {
      const Section = sectionComponents[sectionKey];

      if (!Section) return null;

      return {
        key: sectionKey,
        jsx: await Section({
          heading: headings[sectionKey],
          fetchAll: fetchAllPerSection[sectionKey] ?? fetchAll,
          fresh: freshPerSection[sectionKey] ?? fresh,
        }),
      };
    }),
  );

  return (
    <div>
      {results.map((section) =>
        section ? (
          <Suspense key={section.key} fallback={<GridSkeleton />}>
            {section.jsx}
          </Suspense>
        ) : null,
      )}
    </div>
  );
}
