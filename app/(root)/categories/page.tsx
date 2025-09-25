import AllProductsSummary from "@/components/layout/all-products-summary";

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
