import Header from "@/components/custom-ui/header";
import { Button } from "@heroui/button";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import TypeEffect from "../custom-ui/type-effect";
// Define the type for explore item data
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl text-center ">
        <TypeEffect />
        <p className="text-gray-600 text-center font-semibold text-3xl mb-2">
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
            <div className="space-y-6 bg-slate-50  p-10 h-full ">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-red-400 mb-2">
                  What You Have Been Struggling
                </h3>
                <h4 className="text-xl font-semibold text-red-400 mb-2">
                  Your Challenges
                </h4>
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
            <div className="space-y-6 bg-slate-50  p-10 h-full">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-orange-500 mb-2">
                  How We Empower You With
                </h3>
                <h4 className="text-xl font-semibold text-orange-500 mb-2">
                  Our Solutions
                </h4>
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
          <TiDelete className="size-12 text-red-400" />
        ) : (
          <IoCheckmarkCircle className="size-8 text-orange-500" />
        )}
      </Button>
      <p className="text-gray-600 leading-relaxed text-left">{text}</p>
    </div>
  );
};

export default Explore;
