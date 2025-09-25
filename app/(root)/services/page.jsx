export const metadata = {
  title:
    "Our Services - Ferrati Sports | Custom Clothing Manufacturing Services",
  description:
    "Discover our complete range of custom clothing manufacturing services. From design consultation to production and quality control - we've got you covered.",
  keywords:
    "custom clothing services, manufacturing services, design consultation, production services, quality control, apparel services",
  openGraph: {
    title: "Ferrati Sports Services - Custom Clothing Manufacturing",
    description:
      "Complete range of custom clothing manufacturing services from design to production.",
    type: "website",
    url: "https://ferrati-sports.com/services",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
