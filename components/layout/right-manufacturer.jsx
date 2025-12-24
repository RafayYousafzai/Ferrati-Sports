"use client";
import Separator from "../separator";

const scenarios = [
  {
    image:
      "https://images.unsplash.com/photo-1556745753-b2904692b3cd?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000",
    title: (
      <>
        Launch real collections instead of stuck in
        <span className="font-extrabold  ">“sampling forever”</span>
      </>
    ),
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000",
    title: (
      <>
        Sell with confidence because
        <span className="font-extrabold  "> quality is consistent</span> every
        time
      </>
    ),
    gradient: "from-green-500/20 to-teal-500/20",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000",
    title: (
      <>
        Scale your brand, not just produce{" "}
        <span className="font-extrabold ">products</span>{" "}
      </>
    ),
    gradient: "from-orange-500/20 to-pink-500/20",
  },
];

const RightManufacturer = () => {
  return (
    <div className="pb-6 sm:pb-20 lg:pb-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* <Header
          title="Real Reason Your Brand is still behind  "
          highlightedTitle=""
          // subtitle="We deliver excellence in every aspect of sportswear manufacturing, making your brand vision a reality."
        /> */}

        <div className="mb-16 mt-20 mx-2 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Once You Work With Right
            <span className="text-orange-500"> Manufacturer</span>{" "}
          </h2>
          {/* <span className="block mx-auto text-center text-3xl font-bold mb-6 leading-tight bg-clip-text text-orange-500">
            (It's Not What You Think)
          </span> */}
          <Separator bg="accent" />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg "
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${scenario.gradient} opacity-0  `}
                />
                <img
                  src={scenario.image}
                  alt={scenario.title}
                  className="w-full h-full aspect-square object-cover "
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3 text-center">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight italic">
                  {typeof scenario.title === "string"
                    ? scenario.title
                    : scenario.title}
                  <span className="block text-orange-500 dark:text-blue-400 mt-1">
                    {typeof scenario.subtitle === "string"
                      ? scenario.subtitle
                      : scenario.subtitle}
                  </span>
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        {/* <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto mx-auto justify-center">
            <Link href="/request-quote" passHref>
              <Button
                disableRipple
                className="border-1 border-e-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white font-bold text-base lg:text-lg px-12 py-8 border-orange-500 tracking-wider [&]:hover:opacity-100"
                radius="full"
                size="lg"
                variant="bordered"
              >
                START FOR FREE
              </Button>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RightManufacturer;
