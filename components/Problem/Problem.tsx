import { Button } from "@heroui/button";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";

type ExploreItem = { description: string; type: "problem" | "solution" };

type ExploreProps = {
  problemItems: ExploreItem[];
  solutionItems: ExploreItem[];
};

const badgeBg =
  "bg-gradient-to-r from-orange-400 to-yellow-400 border-orange-200";
const badgeText = "text-white";

const Problem = ({ problemItems, solutionItems }: ExploreProps) => {
  return (
    <section className="mt-20 py-16">
      {/* Problem Section - Empathy */}
      <div className="container mx-auto px-4 max-w-6xl text-balance">
        <div className="text-center mb-12">
          <span
            className={`px-4 py-2 ${badgeBg} rounded-full ${badgeText} font-semibold text-sm uppercase tracking-wider border`}
          >
            THE PROBLEM
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-8 mb-6">
            Tired of Unreliable Manufacturers?
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              You have got big plans for your brand but your manufacturer keeps
              letting you down.
            </p>
            <p className="font-semibold text-xl text-gray-800">
              Late deliveries, poor stitching, unclear pricing its exhausting.
            </p>
            <p>You are not asking for much.</p>
            <p className="text-xl">
              You just want a partner who{" "}
              <span className="text-orange-600 font-semibold">
                understands your brand, keeps promises,
              </span>{" "}
              and delivers what you envisioned.
            </p>
          </div>
        </div>

        {/* Problem vs Solution Comparison */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mt-16">
          {/* Problems Column */}
          <div className="space-y-6 h-full">
            <div className="space-y-6 bg-red-50 border-2 border-red-200 p-10 rounded-lg h-full">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-red-700 mb-2">
                  Traditional Manufacturing
                </h3>
                <p className="text-red-600">What frustrates you</p>
              </div>
              {problemItems?.map((item, index) => (
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
            <div className="space-y-6 bg-gradient-to-br from-orange-500 to-orange-600 p-10 rounded-lg h-full shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  The Ferrati Difference
                </h3>
                <p className="text-orange-100">What you deserve</p>
              </div>
              {solutionItems?.map((item, index) => (
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

      {/* CTA Section */}
      <div className="relative py-16 mt-16 px-4 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#f97316_1px,transparent_0)] bg-[length:40px_40px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-balance">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700">
              Manufacturing Shouldn't Be This Hard.
              <br />
              <span className="text-orange-600">
                You deserve a factory that listens, delivers, and cares about
                your brand.
              </span>
            </h2>
          </div>

          {/* CTAs */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-12">
            <Link href={"/request-quote"}>
              <Button
                className="min-w-[240px] bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold"
                radius="sm"
                size="lg"
              >
                Get a Free Quote
              </Button>
            </Link>
            <a
              href="https://wa.me/923328574009"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="min-w-[240px] bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg font-semibold"
                radius="sm"
                size="lg"
              >
                Chat on WhatsApp
              </Button>
            </a>
          </div>

          {/* Supporting text */}
          <p className="text-center text-gray-600 font-medium mt-6 text-lg">
            Stop chasing unreliable factories. Lets talk.
          </p>
        </div>
      </div>
    </section>
  );
};

type ExploreCardProps = {
  text: string;
  type: "problem" | "solution";
};

const ExploreCard = ({ text, type }: ExploreCardProps) => {
  const isProblem = type === "problem";

  return (
    <div className="flex gap-3 items-start">
      <div className="flex-shrink-0 mt-1">
        {isProblem ? (
          <TiDelete className="size-8 text-red-600" />
        ) : (
          <IoCheckmarkCircle className="size-8 text-white" />
        )}
      </div>
      <p
        className={`leading-relaxed text-left ${isProblem ? "text-gray-700" : "text-white"}`}
      >
        {text}
      </p>
    </div>
  );
};

export default Problem;
