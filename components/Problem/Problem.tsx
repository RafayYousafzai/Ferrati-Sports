import { Button } from "@heroui/button";
import Link from "next/link";
import {
  TrendingDown,
  PackageX,
  AlertTriangle,
  Clock,
  Archive,
  TrendingUp,
  ShieldCheck,
  BadgeCheck,
  Headphones,
  Zap,
} from "lucide-react";

const Problem = () => {
  // Hardcoded problem items with icons
  const problemItems = [
    {
      id: "1",
      icon: TrendingDown,
      description:
        "Slow to follow new trends, which means you lose buyers to faster competitors.",
    },
    {
      id: "2",
      icon: PackageX,
      description:
        "Making more stock than needed, leaving you with waste and money loss.",
    },
    {
      id: "3",
      icon: AlertTriangle,
      description:
        "Weak checks on quality, causing damaged or faulty products to reach customers.",
    },
    {
      id: "4",
      icon: Clock,
      description:
        "Support teams that don't respond quickly, leaving you stuck and delayed.",
    },
    {
      id: "5",
      icon: Archive,
      description:
        "Old ways of working that keep your brand behind while others move forward.",
    },
  ];

  // Hardcoded solution items with icons
  const solutionItems = [
    {
      id: "1",
      icon: TrendingUp,
      description:
        "Fast response to trends so your products reach the market on time.",
    },
    {
      id: "2",
      icon: ShieldCheck,
      description:
        "Smarter order control that avoids waste and protects your money.",
    },
    {
      id: "3",
      icon: BadgeCheck,
      description:
        "Careful quality checks at every stage to stop defects before they happen.",
    },
    {
      id: "4",
      icon: Headphones,
      description:
        "A support team that is always ready with quick and clear answers.",
    },
    {
      id: "5",
      icon: Zap,
      description:
        "Modern systems and fresh ideas that prepare your brand for the future.",
    },
  ];
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto max-w-4xl text-balance">
        <h2 className="text-4xl capitalize  font-bold text-center text-gray-900 mb-6">
          You design. We make. <span className="text-orange-500">You win.</span>
        </h2>
        <div className="w-32 rounded-2xl h-1 bg-orange-500 mx-auto mb-10 mt-2" />
        <p className="text-md sm:text-xl text-center text-gray-900 leading-relaxed">
          We're client partners first, committed to paving the way for growth.
          We're focused on helping brands disrupt their industry through digital
          marketing. We're also big on a work life balance. We've built a team
          of fun, driven, and motivated specialists who are encouraged to live
          our company values.
        </p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white py-16 px-10 lg:px-10 rounded-3xl shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Side - Card with gradient background and bullet points */}
            <div className="relative rounded-3xl bg-gradient-to-br from-orange-700 via-orange-500 to-orange-700 p-6 lg:p-8 shadow-2xl">
              <div className="bg-white backdrop-blur-3xl rounded-2xl p-6 lg:p-8 shadow-lg">
                {/* Header */}
                <div className="mb-3">
                  <p className="text-black text-md font-bold uppercase">
                    Problems
                  </p>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-4">
                  {problemItems?.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <Icon className="w-4 h-4 text-red-600" />
                        </div>
                        <p className="text-gray-900 font-semibold text-left text-sm">
                          {item.description}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Right Side - Heading and CTA above */}
            <div className="space-y-8">
              {/* Heading */}
              <div>
                <h2 className="text-[45px] font-extrabold leading-tight mb-4 -mt-4">
                  <span className="text-neutral-900">
                    What You Have Been
                    <span className="text-orange-500"> Struggling With.</span>
                  </span>
                </h2>

                <p className="text-base lg:text-lg text-neutral-700 leading-relaxed max-w-2xl">
                  Slow trend adoption, overproduction, and weak quality control
                  lead to losses and customer issues — while poor support and
                  outdated processes keep your brand lagging behind faster
                  competitors.
                </p>
                <br />
                <p className="text-base lg:text-lg text-neutral-700 leading-relaxed max-w-2xl">
                  We{" "}
                  <span className="text-orange-500 font-semibold">
                    {" "}
                    know the feeling.
                  </span>{" "}
                  You have amazing plans for your brand, but your manufacturer
                  keeps dropping the ball.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <Link href="/request-quote">
                  <Button
                    variant="bordered"
                    className="border-1 border-e-orange-500 hover:bg-amber-600 text-orange-500 hover:text-white font-bold text-base lg:text-lg px-12 py-8 border-orange-500 tracking-wider"
                    radius="full"
                    size="lg"
                  >
                    START FOR FREE
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <br />

        {/* Second Section - Solutions */}
        <div className="bg-white py-16 px-10 lg:px-10 rounded-3xl shadow-xl mt-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Side - Heading and CTA */}
            <div className="space-y-8">
              {/* Heading */}
              <div>
                <h2 className="text-[45px] font-extrabold leading-tight mb-4 -mt-4">
                  <span className="text-neutral-900">
                    How{" "}
                    <span className="text-orange-500">Ferrati Empowers</span>{" "}
                    You With.
                  </span>
                </h2>

                <p className="text-base lg:text-lg text-neutral-700 leading-relaxed max-w-2xl">
                  Quick trend adaptation, smart order management, and strict
                  quality control cut waste and defects — while responsive
                  support and modern systems keep your brand ahead and
                  future-ready.
                </p>
                <br />
                <p className="text-base lg:text-lg text-neutral-700 leading-relaxed max-w-2xl">
                  We{" "}
                  <span className="text-orange-500 font-semibold">
                    deliver solutions
                  </span>{" "}
                  that transform your manufacturing challenges into competitive
                  advantages.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <Link href="/request-quote">
                  <Button
                    className="border-1 border-e-orange-500 hover:bg-amber-600 text-orange-500 hover:text-white font-bold text-base lg:text-lg px-12 py-8 border-orange-500 tracking-wider"
                    radius="full"
                    size="lg"
                    variant="bordered"
                  >
                    START FOR FREE
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Card with gradient background and bullet points */}
            <div className="relative rounded-3xl bg-gradient-to-br  from-orange-700 via-orange-500 to-orange-700   p-6 lg:p-8 shadow-2xl">
              <div className="bg-white backdrop-blur-3xl rounded-2xl p-6 lg:p-8 shadow-lg">
                {/* Header */}
                <div className="mb-3">
                  <p className="text-black text-md font-bold uppercase">
                    Solutions
                  </p>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-4">
                  {solutionItems?.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <Icon className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-gray-900 font-semibold text-left text-sm">
                          {item.description}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
