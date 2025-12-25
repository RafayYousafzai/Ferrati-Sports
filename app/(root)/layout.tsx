import dynamic from "next/dynamic";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import Link from "next/link";

import Footer from "@/components/layout/footer";
import Appbar from "@/components/layout/navbar/navbar";
import ScrollProgress from "@/components/layout/scroll-progress";

// 🔹 Lazy load below-the-fold sections
const NewsletterSection = dynamic(
  () => import("@/components/layout/newsletter/newsletter-section"),
  { loading: () => <div className="h-32 animate-pulse bg-gray-200 rounded" /> }
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
        <div className="h-[30vh] bg-white flex justify-center items-center cursor-pointer hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-50 transition-all duration-300 group ">
          <h1 className="text-black text-4xl md:text-6xl font-bold transition-colors duration-300 text-center flex items-center">
            Ready to Start Your First Sample?{" "}
            <span className="text-orange-600 ml-2">Let’s Talk!</span>
          </h1>
          <ArrowRight className="ml-4 w-12 h-12 text-orange-500 group-hover:text-orange-600 group-hover:translate-x-2 transition-all duration-300" />
        </div>
      </Link>
      <Footer />
    </>
  );
}
