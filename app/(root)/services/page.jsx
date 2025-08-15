import AllProductsSummary from "@/components/layout/all-products-summary";

const title = "Explore All";
const highlightedTitle = "Blogs";
const subtitle = "Browse all our articles, stories, and updates in one place.";

export default async function Page() {
  return (
    <section>
      <AllProductsSummary
        fetchAllPerSection={{
          fabrics: false,
          categories: false,
          blogs: false,
          services: true,
        }}
        freshPerSection={{
          fabrics: false,
          categories: false,
          blogs: false,
          services: true,
        }}
        headings={{
          services: {
            // ✅ move custom heading here
            highlightedTitle,
            subtitle,
            title,
          },
        }}
        order={["services", "fabrics", "categories", "blogs"]}
      />
    </section>
  );
}
