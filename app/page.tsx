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
import Card from "@/components/custom-ui/card";
import ProductDetails from "@/components/layout/product-details";
import NewsletterSection from "@/components/layout/newsletter-section";

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

// Sample data matching the image
const sampleSolutions = [
  {
    id: "1",
    title: "Data & Analytics",
    icon: "analytics",
    services: [
      { name: "Data Analytics & Insights" },
      { name: "Dashboard Development" },
      { name: "Conversion Rate Optimization" },
      { name: "User Experience" },
      { name: "Front End Development" },
      { name: "Ad Operations" },
    ],
  },
  {
    id: "2",
    title: "Earned Media",
    icon: "earned",
    services: [
      { name: "AI Search Optimization" },
      { name: "Search Engine Optimization" },
      { name: "App Store Optimization" },
      { name: "Content Marketing" },
      { name: "Digital PR" },
      { name: "Influencer Marketing" },
      { name: "Organic Social Media" },
      { name: "Email Marketing" },
    ],
  },
  {
    id: "3",
    title: "Paid Media",
    icon: "paid",
    services: [
      { name: "Media Strategy & Planning" },
      { name: "Paid Search" },
      { name: "Paid Social" },
      { name: "Programmatic & Display" },
      { name: "Marketplaces" },
      { name: "Streaming" },
    ],
  },
  {
    id: "4",
    title: "Creative",
    icon: "creative",
    services: [
      { name: "Performance Creative" },
      { name: "Branding" },
      { name: "Content Production" },
      { name: "Website Design" },
      { name: "Graphic & Motion Design" },
      { name: "Audio Production" },
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

export default function Home() {
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
      <ServiceCards cards={WhyChooseUsCards} />;
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
      <Solutions cards={sampleSolutions} />
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
      <NewsletterSection />
    </>
  );
}
