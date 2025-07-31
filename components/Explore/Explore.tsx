import Image from "next/image";
import ExploreItem from "./ExploreItem";

// Define the type for explore item data
interface ExploreItemData {
  itemCSS: "xl:text-right xl:items-end" | "xl:text-left items-start";
  icon: `${string}.svg`;
  text: {
    title: string;
    description: string;
  };
}

const Explore = () => {
  // Data for left column items
  const leftColumnItems: ExploreItemData[] = [
    {
      itemCSS: "xl:text-right xl:items-end",
      icon: "broken-fabric.svg", // Replace with your own SVG icon
      text: {
        title: "Unreliable Quality",
        description:
          "Dealing with poor stitching, inconsistent fabric, and color mismatches that damage your brand’s reputation.",
      },
    },
    {
      itemCSS: "xl:text-right xl:items-end",
      icon: "delay-timer.svg",
      text: {
        title: "Delays & Missed Deadlines",
        description:
          "Late deliveries costing you frustrated clients and lost revenue opportunities.",
      },
    },
    {
      itemCSS: "xl:text-right xl:items-end",
      icon: "pricing-confusion.svg",
      text: {
        title: "Lack of Control",
        description:
          "Stuck with high MOQs, limited options, unclear pricing, and no real-time updates from your manufacturer.",
      },
    },
  ];

  // Data for right column items
  const rightColumnItems: ExploreItemData[] = [
    {
      itemCSS: "xl:text-left items-start",
      icon: "badge-quality.svg",
      text: {
        title: "Consistent Quality, Fewer Returns",
        description:
          "Achieve 85% fewer returns with high-precision production and strict quality control to protect your brand.",
      },
    },
    {
      itemCSS: "xl:text-left items-start",
      icon: "fast-delivery.svg",
      text: {
        title: "Rapid Turnarounds",
        description:
          "Launch faster with up to 60% quicker production times — keeping you ahead of market demands.",
      },
    },
    {
      itemCSS: "xl:text-left items-start",
      icon: "flexible-tools.svg",
      text: {
        title: "More Freedom, Less Stress",
        description:
          "Get low MOQs, flexible design options, and real-time updates — all with transparent, reliable pricing.",
      },
    },
  ];

  return (
    <section className="py-12 xl:py-0 xl:h-[90vh]  mb-4 overflow-none">
      <div className="container mx-auto xl:w-full xl:h-full flex xl:justify-center xl:items-center">
        <div className="w-full flex flex-col lg:flex-row gap-12 xl:gap-20">
          {/* Left Column */}
          <div className="flex-1 flex flex-col justify-around items-end text-center xl:text-left gap-12 xl:gap-0 max-w-[400px] mx-auto xl:max-w-none xl:mx-0">
            {leftColumnItems.map((item, index) => (
              <ExploreItem
                key={`left-${index}`}
                itemCSS={item.itemCSS}
                icon={item.icon}
                text={item.text}
              />
            ))}
          </div>

          {/* Center Image */}
          <div className="hidden xl:flex justify-center">
            <div className="relative w-[322px] h-[680px]">
              <Image
                src="/assets/manwearing.png"
                fill
                alt=""
                className="object-cover"
                quality={100}
                priority
                data-scroll
                data-scroll-speed="0.1"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col justify-around text-center xl:text-left gap-12 xl:gap-0 max-w-[400px] mx-auto xl:max-w-none xl:mx-0">
            {rightColumnItems.map((item, index) => (
              <ExploreItem
                key={`right-${index}`}
                itemCSS={item.itemCSS}
                icon={item.icon}
                text={item.text}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
