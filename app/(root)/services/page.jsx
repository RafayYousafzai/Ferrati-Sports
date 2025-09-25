import AllProductsSummary from "@/components/layout/all-products-summary";

const title = "Learn All";
const highlightedTitle = "Services";
const subtitle =
  "Discover our complete range of services tailored to meet your needs.";

export default async function Page() {
  return (
    <div className="pt-20">
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
    </div>
  );
}
