import CounterSection from "@/components/layout/counter-section";
import Explore from "@/components/Explore/Explore";
import CategoriesCarousal from "@/components/layout/categories-carousal";
import BentoGridAboutUs from "@/components/layout/bento-grid-about-us";
import ServiceCards from "@/components/service-cards";
import Solutions from "@/components/layout/solutions";
import VideoShowcase from "@/components/layout/video-showcase.tsx";
import Hero from "@/components/layout/hero";
import Header from "@/components/custom-ui/header";
import JoinOurCommunity from "@/components/custom-ui/join-our-community";
import Testimonials from "@/components/layout/testimonials";
import ProductDetails from "@/components/layout/product-details";
import NewsletterSection from "@/components/layout/newsletter-section";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

// Example usage with sample data
const WhyChooseUsCards = [
  {
    id: "1",
    title: "Customized Solutions",
    description:
      "Every piece is crafted specifically to match your brand's unique style, fabric choice, and fit.",
    icon: "building",
  },
  {
    id: "2",
    title: "Fast Turnaround Time",
    description:
      "From samples in 7-10 days to bulk orders in 3-4 weeks, we meet deadlines so you can meet your customers' demands.",
    icon: "store",
  },
  {
    id: "3",
    title: "Comprehensive Support",
    description:
      "Our in-house design team, pattern makers, and packaging experts are here to ensure your brand vision comes to life.",
    icon: "settings",
  },
  {
    id: "4",
    title: "Innovative Design",
    description:
      "We push the boundaries of traditional manufacturing with cutting-edge techniques and sustainable practices.",
    icon: "lightbulb",
  },
];

const materials = [
  {
    id: "1",
    title: "Comfort & Feel",
    icon: "comfort",
    href: "/fabrics/comfort",
    services: [
      { name: "Soft and breathable fabrics like Cotton and French Terry" },
      { name: "Ideal for t-shirts, hoodies, and casual wear" },
      { name: "Warm and cozy options like Cotton Fleece" },
      { name: "Gentle against the skin" },
    ],
  },
  {
    id: "2",
    title: "Durability & Performance",
    icon: "durability",
    href: "/fabrics/durability",
    services: [
      { name: "Durable fabrics like Polyester and Softshell" },
      { name: "Perfect for activewear and jackets" },
      { name: "Moisture-wicking and water-resistant options" },
      { name: "Lightweight and long-lasting" },
    ],
  },
  {
    id: "3",
    title: "Printability & Customization",
    icon: "printability",
    href: "/fabrics/printability",
    services: [
      { name: "Fabrics like Cotton Blend and Scuba for printing" },
      { name: "Supports screen printing, sublimation, and embroidery" },
      { name: "Great for bold designs and logos" },
      { name: "Versatile for custom apparel" },
    ],
  },
  {
    id: "4",
    title: "Luxury & Style",
    icon: "luxury",
    href: "/fabrics/luxury",
    services: [
      { name: "Premium fabrics like Leather and Polar Fleece" },
      { name: "Ideal for stylish jackets and accessories" },
      { name: "Rich textures and unique aesthetics" },
      { name: "Elevates brand appeal" },
    ],
  },
];

const sampleVideos = [
  {
    id: "creative-storytelling",
    title: "Creative Marketing Campaign",
    description:
      "An innovative approach to digital storytelling that captures audience attention and drives engagement through compelling visual narratives.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    category: "Creative",
  },
  {
    id: "digital-execution",
    title: "Marketing Analytics Dashboard",
    description:
      "A comprehensive look at how data-driven insights power modern marketing strategies and deliver measurable results.",
    youtubeId: "jNQXAC9IVRw", // Replace with actual YouTube video ID
    category: "Technical",
  },
];

export default async function Home() {
  const cookieStore: any = await cookies();
  const supabase = createClient(cookieStore);

  const { data: fabrics } = await supabase.from("fabrics").select("*");

  return (
    <>
      <Hero />
      <CounterSection />
      <Header
        badge="Ferrati"
        title="Why "
        highlightedTitle="Choose Us"
        subtitle="Discover the unparalleled advantages that make us the ideal partner for bringing your brand's vision to life."
      />
      <ServiceCards cards={WhyChooseUsCards as any} />;
      <Header
        title="The New Standard in "
        highlightedTitle="Production"
        subtitle="We believe in doing things differently. While traditional manufacturers stick to outdated processes, we push the boundaries of what’s possible. We offer customized solutions, quick turnarounds, and unmatched flexibility, ensuring that your designs are brought to life exactly the way you envision."
      />
      <div className="hidden md:block">
        <Explore />
      </div>
      <div className="block md:hidden">
        <BentoGridAboutUs />
      </div>
      <Solutions cards={materials as any} />
      <Header
        badge="OUR APPROACH"
        title="Sell without "
        highlightedTitle="Selling"
        subtitle="We Believe In Building trust through unparalleled quality and genuine partnerships, allowing our exceptional work to speak for itself."
      />
      <VideoShowcase videos={sampleVideos} />
      <JoinOurCommunity />
      <CategoriesCarousal />
      <ProductDetails
        sectionTitle="OPPORTUNITIES"
        headline="Build your career with innovative leaders."
        description={[
          "We believe in fostering talent and creating opportunities for growth. Our team is passionate about digital innovation and committed to delivering exceptional results for our clients.",
        ]}
        buttonText="View positions"
        image={"https://heroui.com/images/album-cover.png"}
        variant="white"
      />
      <Testimonials />
      <NewsletterSection headline={""} description={""} />
    </>
  );
}
