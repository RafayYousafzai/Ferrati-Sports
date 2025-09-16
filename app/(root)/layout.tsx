import dynamic from "next/dynamic";

import Footer from "@/components/layout/footer";
import Appbar from "@/components/layout/navbar/navbar";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

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
    buttonText: "Get a Price",
    description: [
      "Easily estimate your project cost in just a few clicks. Our calculator helps you plan your budget, compare options, and get clarity before you start.",
    ],
    headline: "Get an instant estimate for your project.",
    href: "/calculate-price",
    image: "/assets/photo-calculator.webp",
    reversed: true,
    sectionTitle: "WORK WITH US",
    variant: "orange" as const,
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
          <FerratiAccordion />
          {PRODUCT_DETAILS_SECTIONS.map((props, idx) => (
            <ProductDetails key={idx} {...props} />
          ))}
        </section>
      </main>

      <Link href="/services/0c6e3849-b21e-468f-bb43-44cd5284ac4f">
        <div className="h-[30vh] bg-white flex items-center cursor-pointer hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-50 transition-all duration-300 group ">
          <h1 className="text-orange-500 text-4xl md:text-6xl font-bold ml-[3%] group-hover:text-orange-600 transition-colors duration-300 text-left">
            Ready to Start Your First Free Sample
          </h1>
          <ArrowRightCircle className="ml-4 pt-1 w-12 h-12 text-orange-500 group-hover:text-orange-600 group-hover:translate-x-2 transition-all duration-300" />
        </div>
      </Link>
      <Footer />
    </>
  );
}
