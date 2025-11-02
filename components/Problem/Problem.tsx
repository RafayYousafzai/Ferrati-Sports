import { Button } from "@heroui/button";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";
import Image from "next/image";

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
    <section className="mt-10 pt-16">
      {/* Intro Section */}
      <div className="container mx-auto px-4 max-w-6xl text-balance mb-16">
        <div className="text-center">
          <span
            className={`px-4 py-2 ${badgeBg} rounded-full ${badgeText} font-semibold text-sm uppercase tracking-wider border`}
          >
            THE PROBLEM
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 mb-4">
            Tired of Manufacturers Who Let You Down?
          </h2>
          <div className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed">
            <p className="mb-3">
              You&apos;ve got big plans for your brand, but your current
              manufacturer keeps messing things up. Late shipments, sloppy
              stitching, prices that don&apos;t make sense—it&apos;s
              frustrating.
            </p>
            <p className="font-semibold text-gray-900">
              You just need a partner who{" "}
              <span className="text-orange-600">
                gets your vision, keeps their word,
              </span>{" "}
              and actually delivers what you asked for.
            </p>
          </div>
        </div>
      </div>

      {/* Problem Section - Points on Left, Image on Right */}
      <div className="container mx-auto px-4 max-w-7xl mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Problems - Left Side */}
          <div className="space-y-6 flex flex-col">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                What Usually Goes Wrong
              </h3>
              <p className="text-gray-600 text-lg">
                The stuff that drives you crazy
              </p>
            </div>
            <div className="space-y-5">
              {problemItems?.map((item, index) => (
                <ExploreCard
                  key={`problem-${index}`}
                  text={item.description}
                  type={item.type}
                />
              ))}
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="relative min-h-[400px] h-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              fill
              alt="Manufacturing problems and delays"
              className="object-cover"
              src="https://images.unsplash.com/photo-1633613286880-dae9f126b728?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* Solution Section - Image on Left, Points on Right */}
      <div className="container mx-auto px-4 max-w-7xl mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Image - Left Side */}
          <div className="relative min-h-[400px] h-full rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
            <Image
              fill
              alt="Quality sportswear manufacturing"
              className="object-cover"
              src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Solutions - Right Side */}
          <div className="space-y-6 flex flex-col order-1 lg:order-2">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                How We Do Things Better
              </h3>
              <p className="text-gray-600 text-lg">What you get with us</p>
            </div>
            <div className="space-y-5">
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
              Manufacturing Shouldn&apos;t Be This Hard.
              <br />
              <span className="text-orange-600">
                Work with a team that actually cares about your success.
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
              href="/services/free-clothing-samples"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button
                className="min-w-[240px] bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg font-semibold"
                radius="sm"
                size="lg"
              >
                Get Free Sample
              </Button>
            </a>
          </div>

          {/* Supporting text */}
          <p className="text-center text-gray-600 font-medium mt-6 text-lg">
            Stop chasing unreliable factories. Let&apos;s talk.
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
          <IoCheckmarkCircle className="size-8 text-green-600" />
        )}
      </div>
      <p className="leading-relaxed text-left text-gray-900">{text}</p>
    </div>
  );
};

export default Problem;
