import AllProductsSummary from "@/components/layout/all-products-summary";

export default async function Page() {
  return (
    <section>
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
      />
    </section>
  );
}
