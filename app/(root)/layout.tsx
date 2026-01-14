import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import Footer from "@/components/layout/footer";
import Appbar from "@/components/layout/navbar/navbar";
import ScrollProgress from "@/components/layout/scroll-progress";

// 🔹 Lazy load below-the-fold sections
const NewsletterSection = dynamic(
  () => import("@/components/layout/newsletter/newsletter-section"),
  { loading: () => <div className="h-32 animate-pulse bg-gray-200 rounded" /> },
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Appbar />
      <main className="min-h-screen">{children}</main>

      <Link href="/contact">
        <div className="h-auto md:h-[30vh] bg-white flex flex-col md:flex-row justify-center items-center cursor-pointer hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-50 transition-all duration-300 group py-8 md:py-0 px-4 md:px-0">
          <h4 className="text-black text-2xl md:text-4xl lg:text-6xl font-bold transition-colors duration-300 text-center flex flex-col md:flex-row items-center">
            Ready to Scale?{" "}
            <span className="text-orange-600 md:ml-2 mt-2 md:mt-0">
              Let's Talk!
            </span>
          </h4>
          <ArrowRight className="ml-0 md:ml-4 w-8 md:w-12 h-8 md:h-12 text-orange-500 group-hover:text-orange-600 group-hover:translate-x-2 transition-all duration-300 mt-4 md:mt-0" />
        </div>
      </Link>
      <Footer />
    </>
  );
}
