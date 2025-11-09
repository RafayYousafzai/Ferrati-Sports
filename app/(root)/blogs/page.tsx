import { Metadata } from "next";

import AllProductsSummary from "@/components/layout/all-products-summary";
import FerratiAccordion from "@/components/layout/accordian";

export const metadata: Metadata = {
  title: "Blogs - Ferrati Sports | Fashion & Manufacturing Insights",
  description:
    "Discover the latest trends in custom clothing, sportswear manufacturing, and fashion industry insights from Ferrati Sports experts.",
  keywords:
    "fashion blogs, clothing manufacturing insights, sportswear trends, custom clothing tips, manufacturing blog, fashion industry news",
  openGraph: {
    title: "Ferrati Sports Blogs - Fashion & Manufacturing Insights",
    description:
      "Latest trends and insights in custom clothing and sportswear manufacturing.",
    type: "website",
    url: "https://ferrati-sports.com/blogs",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  return (
    <div className="pt-20">
      <AllProductsSummary
        fetchAllPerSection={{
          categories: false, // ✅ limit categories to 3
          fabrics: false, // ✅ limit fabrics to 3
          blogs: true, // ✅ all blogs
        }}
        freshPerSection={{
          categories: false, // ✅ cached categories
          fabrics: false, // ✅ cached fabrics
          blogs: true, // ✅ fresh blogs
        }}
        headings={{
          blogs: {
            highlightedTitle: "Blogs ",
            title: "All",
            subtitle: "Explore all our latest articles, tips, and updates",
          },
        }}
        order={["blogs", "categories", "fabrics"]}
      />{" "}
      <FerratiAccordion calculator={false} />
    </div>
  );
}
