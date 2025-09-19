import { Button } from "@heroui/button";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";
import { Chip } from "@heroui/chip";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

type ExploreItem = { description: string; type: "problem" | "solution" };

type ExploreProps = {
  problemItems: ExploreItem[];
  solutionItems: ExploreItem[];
};

const badgeBg =
  "bg-gradient-to-r from-orange-400 to-yellow-400 border-orange-200";
const badgeText = "text-white";

const Explore = ({ problemItems, solutionItems }: ExploreProps) => {
  return (
    <section className="mt-20 ">
      <div className={"container mx-auto px-4 max-w-7xl text-center mb-4"}>
        <span
          className={`px-4 py-2 ${badgeBg} rounded-full ${badgeText} font-semibold text-sm uppercase tracking-wider border`}
        >
          FERRATI
        </span>
      </div>
      <div className="container mx-auto px-4 max-w-7xl text-center ">
        <ContainerTextFlip
          textClassName="text-6xl font-extrabold text-gray-800 "
          words={["We Own It.", "We Build It.", "We Deliver."]}
        />

        <p className="text-gray-600 text-center font-semibold text-3xl mb-2 ">
          We are the alternative to Traditional Manufacturing
        </p>
        <p className="text-gray-600 text-center text-lg">
          We break from outdated methods, delivering custom solutions with speed
          and flexibility—bringing your vision to life exactly as you imagine
          it.
        </p>
        <p className="text-gray-600 text-center text-lg">
          Traditional manufacturing brings problems. We bring the solutions. See
          how we compare below.
        </p>
        <br />
        <br />
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Problems Column */}
          <div className="space-y-6 h-full">
            <div className="space-y-6 bg-orange-500  p-10 h-full ">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">Problem </h3>
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
            <div className="space-y-6 bg-orange-500  p-10 h-full ">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Solution{" "}
                </h3>
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
      <div className="relative  py-12 mt-16 px-4 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#f97316_1px,transparent_0)] bg-[length:40px_40px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
              Tired of running into the same <br /> Manufacturing Problems
            </h1>
          </div>

          {/* Fixed alignment */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-1 mt-12">
            <Link href={"/request-quote"}>
              <Button
                className="min-w-sm  bg-orange-500 text-white"
                radius="sm"
                size="lg"
              >
                Request a Quote
              </Button>
            </Link>
            <a href="tel:+923328574009">
              <Button
                className="min-w-sm  bg-[#013056] text-white"
                radius="sm"
                size="lg"
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
  text: string;
  type: "problem" | "solution";
};

const ExploreCard = ({ text, type }: ExploreCardProps) => {
  const isProblem = type === "problem";

  return (
    <div className="flex-1 flex gap-3 items-center">
      <Button isIconOnly className="bg-transparent" radius="full">
        {isProblem ? (
          <TiDelete className="size-12 text-white" />
        ) : (
          <IoCheckmarkCircle className="size-8 text-white" />
        )}
      </Button>
      <p className="text-white leading-relaxed text-left">{text}</p>
    </div>
  );
};

export default Explore;
