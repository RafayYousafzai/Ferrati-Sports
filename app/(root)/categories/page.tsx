import { Metadata } from "next";
import AllProductsSummary from "@/components/layout/all-products-summary";

export const metadata: Metadata = {
  title: "Product Categories - Ferrati Sports | Custom Clothing & Sportswear",
  description:
    "Explore our wide range of product categories including custom t-shirts, hoodies, sportswear, jackets, and more. Premium quality manufacturing for your brand.",
  keywords:
    "product categories, custom t-shirts, hoodies, sportswear, jackets, custom clothing categories, apparel categories",
  openGraph: {
    title: "Ferrati Sports Product Categories - Custom Clothing",
    description:
      "Wide range of custom clothing categories including t-shirts, hoodies, sportswear, and more.",
    type: "website",
    url: "https://ferrati-sports.com/categories",
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
          categories: true, // ✅ all categories
          fabrics: false, // ✅ limit fabrics to 3
          blogs: false, // ✅ limit blogs to 3
        }}
        freshPerSection={{
          categories: true, // ✅ live (fresh) categories
          fabrics: false, // ✅ cached fabrics
          blogs: false, // ✅ cached blogs
        }}
        headings={{
          categories: {
            highlightedTitle: "Categories",
            subtitle:
              "Browse our full range of premium apparel and gear — crafted to meet the highest standards for brands worldwide.",
            title: "Explore All",
          },
        }}
        order={["categories", "fabrics", "blogs"]}
      />
    </div>
  );
}
