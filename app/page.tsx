import CounterSection from "@/components/counter-section";
import Hero from "@/components/Hero";
import JoinOurCommunity from "@/components/JoinOurCommunity";
import Header from "@/components/Header";
import Explore from "@/components/Explore/Explore";
import About from "@/components/About";

export default function Home() {
  return (
    <>
      <Hero />
      <CounterSection />
      <JoinOurCommunity />
      <Header
        badge="We own it."
        title="We are the alternative to "
        highlightedTitle="traditional manufacturing"
        subtitle="we believe in doing things differently. While traditional manufacturers stick to outdated processes, we push the boundaries of what’s possible. We offer customized solutions, quick turnarounds, and unmatched flexibility, ensuring that your designs are brought to life exactly the way you envision."
      />
      <Explore />
      <About />
    </>
  );
}
