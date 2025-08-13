import dynamic from "next/dynamic";

import Footer from "@/components/layout/footer";
import Appbar from "@/components/layout/navbar/navbar";

// 🔹 Lazy load below-the-fold sections
const FerratiAccordion = dynamic(
  () => import("@/components/layout/accordian"),
  {
    loading: () => <div className="h-32 animate-pulse bg-gray-200 rounded" />,
  }
);

const NewsletterSection = dynamic(
  () => import("@/components/layout/newsletter/newsletter-section"),
  { loading: () => <div className="h-32 animate-pulse bg-gray-200 rounded" /> }
);

const ProductDetails = dynamic(
  () => import("@/components/layout/product-details"),
  { loading: () => <div className="h-64 animate-pulse bg-gray-200 rounded" /> }
);

// 🔹 Constants to avoid recreating objects
const PRODUCT_DETAILS_SECTIONS = [
  {
    buttonText: "Request Quote",
    description: [
      "Looking for a team that brings your digital ideas to life? From strategy to execution, we deliver tailored solutions that meet your business needs with precision and creativity.",
    ],
    headline: "Request Quote to Build Your Digital Future",
    href: "/request-quote",
    image: "/assets/workers.png",
    reversed: true,
    sectionTitle: "WORK WITH US",
    variant: "orange" as const,
  },
  {
    buttonText: "Calculate Now",
    description: [
      "Curious about project costs? Use our smart price calculator to get an instant estimate based on your specific requirements—no guesswork, just clarity.",
    ],
    headline: "Instant Price Estimates. No Surprises.",
    image: "/assets/cat4.png",
    sectionTitle: "PRICE CALCULATOR",
    variant: "white" as const,
    href: "/calculate-price",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Appbar />
      <main className="min-h-screen">
        {children}

        <section className="space-y-16 mt-16">
          {PRODUCT_DETAILS_SECTIONS.map((props, idx) => (
            <ProductDetails key={idx} {...props} />
          ))}

          <FerratiAccordion />
          <NewsletterSection description="" headline="" />
        </section>
      </main>
      <Footer />
    </>
  );
}
