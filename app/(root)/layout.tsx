import Footer from "@/components/layout/footer";
import Appbar from "@/components/layout/navbar/navbar";
import NewsletterSection from "@/components/layout/newsletter-section";
import ProductDetails from "@/components/layout/product-details";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Appbar />
      <div className="min-h-screen">
        {children}

        <ProductDetails
          buttonText="Request Quote"
          description={[
            "Looking for a team that brings your digital ideas to life? From strategy to execution, we deliver tailored solutions that meet your business needs with precision and creativity.",
          ]}
          headline="Request Quote to Build Your Digital Future"
          href="/request-quote"
          image="/assets/workers.png"
          reversed={true}
          sectionTitle="WORK WITH US"
          variant="orange"
        />
        <ProductDetails
          buttonText="Calculate Now"
          description={[
            "Curious about project costs? Use our smart price calculator to get an instant estimate based on your specific requirements—no guesswork, just clarity.",
          ]}
          headline="Instant Price Estimates. No Surprises."
          image="/assets/cat4.png"
          sectionTitle="PRICE CALCULATOR"
          variant="white"
          href="/calculate-price"
        />
        <NewsletterSection description={""} headline={""} />
      </div>
      <Footer />
    </>
  );
}
