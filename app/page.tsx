import CounterSection from "@/components/counter-section";
import Hero from "@/components/Hero";
import JoinOurCommunity from "@/components/JoinOurCommunity";
import Header from "@/components/Header";
import Explore from "@/components/Explore/Explore";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import BentoGridAboutUs from "@/components/BentoGridAboutUs";
import OurApproach from "@/components/our-approach";
import ServiceCards from "@/components/service-cards";

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

export default function Home() {
  return (
    <>
      <Hero />
      <CounterSection />
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
      <Header
        badge="Ferrati"
        title="Why "
        highlightedTitle="Choose Us"
        subtitle="Discover the unparalleled advantages that make us the ideal partner for bringing your brand's vision to life."
      />
      <ServiceCards cards={WhyChooseUsCards} />;
      <OurApproach />
      <About />
      <Testimonials />
    </>
  );
}
