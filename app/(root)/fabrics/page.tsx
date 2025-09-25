import { Metadata } from "next";
import AllProductsSummary from "@/components/layout/all-products-summary";

export const metadata: Metadata = {
  title: "Premium Fabrics - Ferrati Sports | Choose Your Perfect Material",
  description:
    "Discover premium fabrics for your custom clothing. From cotton to performance materials, learn about texture, GSM, care instructions, and printing compatibility.",
  keywords:
    "premium fabrics, custom clothing materials, cotton fabrics, performance materials, fabric GSM, textile printing, clothing materials",
  openGraph: {
    title: "Ferrati Sports Premium Fabrics - Choose Your Material",
    description:
      "Premium fabrics for custom clothing with detailed specifications and care instructions.",
    type: "website",
    url: "https://ferrati-sports.com/fabrics",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const title = "Choose Your";
const highlightedTitle = " Fabrics";
const subtitle =
  "At Ferrati, discover the perfect fabric for your brand or clothing collection. Explore the advantages and disadvantages of each material, uncover the story behind its name, and understand its true identity. Learn how the fabric feels against the skin—whether it’s soft, textured, warm, or cool—and what it’s like to wear in real life. Find out which fabric is ideal for creating blank t-shirts, vintage hoodies, stylish jackets, or comfortable tracksuits. This comprehensive fabric guide covers everything from GSM, texture, available colors, care instructions, to its compatibility with different printing techniques—helping you make informed, confident choices for your clothing brand.";

export default async function Page() {
  return (
    <div className="pt-20">
      <AllProductsSummary
        fetchAllPerSection={{
          fabrics: true, // ✅ all fabrics
          categories: false, // ✅ limit 3
          blogs: false, // ✅ limit 3
        }}
        freshPerSection={{
          fabrics: true, // ✅ live (fresh) fabrics
          categories: false, // ✅ cached
          blogs: false, // ✅ cached
        }}
        headings={{
          fabrics: {
            // ✅ move custom heading here
            highlightedTitle,
            subtitle,
            title,
          },
        }}
        order={["fabrics", "categories", "blogs"]}
      />
    </div>
  );
}
