import {
  XCircle,
  Clock,
  Shield,
  Zap,
  Settings,
  CheckCircle2,
  Container,
} from "lucide-react";

import Header from "@/components/custom-ui/header";

// Define the type for explore item data
interface ExploreItemData {
  icon: React.ReactNode;
  text: {
    title: string;
    description: string;
  };
  type: "problem" | "solution";
}

const Explore = () => {
  // Data for problem items (left side)
  const problemItems: ExploreItemData[] = [
    {
      icon: <XCircle className="w-8 h-8 text-red-400" />,
      text: {
        title: "Unreliable Quality",
        description:
          "Dealing with poor stitching, inconsistent fabric, and color mismatches that damage your brand's reputation.",
      },
      type: "problem",
    },
    {
      icon: <Clock className="w-8 h-8 text-red-400" />,
      text: {
        title: "Delays & Missed Deadlines",
        description:
          "Late deliveries costing you frustrated clients and lost revenue opportunities.",
      },
      type: "problem",
    },
    {
      icon: <Container className="w-8 h-8 text-red-400" />,
      text: {
        title: "Lack of Control",
        description:
          "Stuck with high MOQs, limited options, unclear pricing, and no real-time updates from your manufacturer.",
      },
      type: "problem",
    },
  ];

  // Data for solution items (right side)
  const solutionItems: ExploreItemData[] = [
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      text: {
        title: "Consistent Quality, Fewer Returns",
        description:
          "Achieve 85% fewer returns with high-precision production and strict quality control to protect your brand.",
      },
      type: "solution",
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      text: {
        title: "Rapid Turnarounds",
        description:
          "Launch faster with up to 60% quicker production times — keeping you ahead of market demands.",
      },
      type: "solution",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-orange-500" />,
      text: {
        title: "More Freedom, Less Stress",
        description:
          "Get low MOQs, flexible design options, and real-time updates — all with transparent, reliable pricing.",
      },
      type: "solution",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <Header
          highlightedTitle="Traditional Manufacturing"
          subtitle="We break from outdated methods, delivering custom solutions with speed and flexibility—bringing your vision to life exactly as you imagine it."
          title="We are the alternative to  "
        />
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Problems Column */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-semibold text-red-400 mb-2">
                Your Challenges
              </h3>
            </div>

            <div className="space-y-6">
              {problemItems.map((item, index) => (
                <ExploreCard
                  key={`problem-${index}`}
                  icon={item.icon}
                  text={item.text}
                  type={item.type}
                />
              ))}
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-semibold text-orange-500 mb-2">
                Our Solutions
              </h3>
            </div>

            <div className="space-y-6">
              {solutionItems.map((item, index) => (
                <ExploreCard
                  key={`solution-${index}`}
                  icon={item.icon}
                  text={item.text}
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

const ExploreCard = ({ icon, text, type }: ExploreCardProps) => {
  const isProblem = type === "problem";

  return (
    <div
      className={`
      group relative bg-slate-50 rounded-none     transition-all duration-300 hover:shadow-lg hover:-translate-y-1
      ${
        isProblem
          ? "border-red-100 hover:border-red-200 hover:shadow-red-50"
          : "border-orange-100 hover:border-orange-200 hover:shadow-orange-50"
      }
    `}
    >
      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon Container */}
          <div
            className={`
            flex-shrink-0 p-3 transition-colors duration-300
            ${
              isProblem
                ? "bg-red-50 group-hover:bg-red-100"
                : "bg-orange-50 group-hover:bg-orange-100"
            }
          `}
          >
            {icon}
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
              {text.title}
            </h4>
            <p className="text-gray-600 leading-relaxed">{text.description}</p>
          </div>
        </div>
      </div>

      {/* Subtle accent border */}
      <div
        className={`
        absolute top-0 left-0 w-full h-1 rounded-t-xl transition-opacity duration-300
        ${isProblem ? "bg-red-400" : "bg-orange-400"}
        opacity-0 group-hover:opacity-100
      `}
      />
    </div>
  );
};

export default Explore;
