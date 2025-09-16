import { Button, ButtonGroup } from "@heroui/button";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import Link from "next/link";
import { Cover } from "@/components/ui/cover";

interface ExploreItemData {
  description: string;

  type: "problem" | "solution";
}

const Explore = () => {
  // Data for problem items (left side)
  const problemItems: ExploreItemData[] = [
    {
      description:
        "Dealing with inconsistent stitching, poor fabric quality, color mismatches.",
      type: "problem",
    },
    {
      description:
        "Frequent delays causing frustrated clients, and lost sales.",
      type: "problem",
    },
    {
      description:
        "Compromising your designs due to restrictive fabric options, high MOQs, and inflexible production.",
      type: "problem",
    },
    {
      description:
        "Manufacturers leaving you in the dark without timely updates, causing uncertainty and operational headaches.",
      type: "problem",
    },
    {
      description:
        "Unclear pricing structures, sudden hidden charges, and unreliable refund policies.",
      type: "problem",
    },
  ];

  // Data for solution items (right side)
  const solutionItems: ExploreItemData[] = [
    {
      description:
        "85% fewer returns, significantly reducing operational costs and protecting your brand reputation.",
      type: "solution",
    },
    {
      description:
        "Up to 60% faster production turnaround compared to typical industry timelines, positioning your products ahead of competitors.",
      type: "solution",
    },
    {
      description:
        "30% improvement in customer satisfaction ratings, achieved through reliable quality, consistent delivery, and dedicated service.",
      type: "solution",
    },
    {
      description:
        "Offering flexible designs, low MOQs, and rapid prototyping for maximum creativity.",
      type: "solution",
    },
  ];

  return (
    <section className="mt-16 ">
      <div className="container mx-auto px-4 max-w-7xl text-center ">
        <ContainerTextFlip
          textClassName="text-6xl font-extrabold text-gray-800 "
          words={["We Own.", "We Build.", "We Deliver."]}
        />

        <p className="text-gray-600 text-center font-semibold text-3xl mb-2 mt-3">
          We are the alternative to Traditional Manufacturing
        </p>
        <p className="text-gray-600 text-center text-lg">
          We break from outdated methods, delivering custom solutions with speed
          and flexibility—bringing your vision to life exactly as you imagine
          it.
        </p>
        <br />
        <br />
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Problems Column */}
          <div className="space-y-6 h-full">
            <div className="space-y-6 bg-white  p-10 h-full ">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-orange-500 mb-2">
                  Problem{" "}
                </h3>
              </div>
              {problemItems.map((item, index) => (
                <ExploreCard
                  key={`problem-${index}`}
                  text={item.description}
                  type={item.type}
                />
              ))}
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-6 h-full">
            <div className="space-y-6 bg-white  p-10 h-full">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-orange-500 mb-2">
                  Solution{" "}
                </h3>
              </div>
              {solutionItems.map((item, index) => (
                <ExploreCard
                  key={`solution-${index}`}
                  text={item.description}
                  type={item.type}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative bg-white py-12 mt-16 px-4 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#f97316_1px,transparent_0)] bg-[length:40px_40px]"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
              Tired of running into the same <br />{" "}
              <Cover>Manufacturing Problems</Cover>
            </h1>
          </div>

          {/* Fixed alignment */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-1 mt-12">
            <Link href={"/request-quote"}>
              <Button
                radius="sm"
                size="lg"
                className=" bg-orange-500 text-white"
              >
                Request a Quote
              </Button>
            </Link>
            <a href="tel:+923328574009">
              <Button
                radius="sm"
                size="lg"
                className=" bg-[#013056] text-white"
              >
                Book a Consultation Call
              </Button>
            </a>
          </div>

          {/* Optional supporting text under buttons */}
          <p className="text-center text-gray-500 font-semibold mt-6">
            Book a call today to see the Ferrati difference.
          </p>
        </div>
      </div>
    </section>
  );
};

type ExploreCardProps = {
  icon: React.ReactNode;
  text: {
    title: string;
    description: string;
  };
  type: "problem" | "solution";
};

const ExploreCard = ({ text, type }: ExploreCardProps) => {
  const isProblem = type === "problem";

  return (
    <div className="flex-1 flex gap-3 items-center">
      <Button isIconOnly radius="full" className="bg-transparent">
        {isProblem ? (
          <TiDelete className="size-12 text-orange-500" />
        ) : (
          <IoCheckmarkCircle className="size-8 text-orange-500" />
        )}
      </Button>
      <p className="text-gray-600 leading-relaxed text-left">{text}</p>
    </div>
  );
};

export default Explore;
