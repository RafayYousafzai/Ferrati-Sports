import { Button } from "@heroui/button";
import Link from "next/link";

type ExploreItem = { description: string; type: "problem" | "solution" };

type ExploreProps = {
  problemItems: ExploreItem[];
  solutionItems: ExploreItem[];
};

const Problem = ({ problemItems, solutionItems }: ExploreProps) => {
  // Calculate summary statistics
  const totalItems = problemItems?.length || 0;

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white py-16 px-10 lg:px-10 rounded-3xl shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Side - Card with gradient background and bullet points */}
            <div className="relative rounded-3xl bg-gradient-to-br from-orange-300 via-orange-500 to-orange-300 p-6 lg:p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg">
                {/* Header */}
                <div className="mb-6">
                  <p className="text-gray-600 text-sm">
                    What usually goes wrong with other manufacturers
                  </p>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-4">
                  {problemItems?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 items-center text-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-left text-sm">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Side - Heading and CTA above */}
            <div className="space-y-8">
              {/* Heading */}
              <div>
                <h2 className="text-5xl font-extrabold leading-tight mb-4">
                  <span className="text-neutral-900">
                    Struggling with
                    <span className="text-orange-600"> Manufacturers</span>
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 bg-clip-text text-transparent drop-shadow-sm">
                    Who Don’t Deliver?
                  </span>
                </h2>
                <p className="text-base lg:text-lg text-neutral-700 leading-relaxed max-w-2xl">
                  We{" "}
                  <span className="text-orange-600 font-semibold">
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

        {/* Second Section */}
        <div className="bg-white py-16 px-10 lg:px-10 rounded-3xl shadow-md mt-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Side - Heading and CTA */}
            <div className="space-y-8">
              {/* Heading */}
              <div>
                <h2 className="text-5xl font-extrabold leading-tight mb-4">
                  <span className="text-neutral-900">
                    How We
                    <span className="text-orange-600"> Empowers You</span>
                  </span>
                  <span className="bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 bg-clip-text text-transparent drop-shadow-sm"></span>
                </h2>
                <p className="text-base lg:text-lg text-neutral-700 leading-relaxed max-w-2xl">
                  We{" "}
                  <span className="text-orange-600 font-semibold">
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

            {/* Right Side - Card with gradient background and bullet points */}
            <div className="relative rounded-3xl bg-gradient-to-br from-orange-300 via-orange-500 to-orange-300 p-6 lg:p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg">
                {/* Header */}
                <div className="mb-6">
                  <p className="text-gray-600 text-sm">What you get with us</p>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 items-center text-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-left text-sm">
                      85% fewer returns, significantly reducing operational
                      costs and protecting your brand reputation.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 items-center text-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-left text-sm">
                      Up to 60% faster production turnaround compared to typical
                      industry timelines, positioning your products ahead of
                      competitors.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 items-center text-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-left text-sm">
                      30% improvement in customer satisfaction ratings, achieved
                      through reliable quality, consistent delivery, and
                      dedicated service.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 items-center text-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-left text-sm">
                      Offering flexible designs, low MOQs, and rapid prototyping
                      for maximum creativity.
                    </p>
                  </li>
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
