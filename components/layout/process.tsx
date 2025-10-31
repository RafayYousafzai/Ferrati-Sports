import { ChevronRight } from "lucide-react";

export default function Process() {
  // Transform cards into 3-step process
  const steps = [
    {
      number: "1",
      title: "Share Your Idea",
      description:
        "Send us your design or idea. We'll guide you through fabric, fit, and finishes.",
    },
    {
      number: "2",
      title: "Approve Your Sample",
      description:
        "Get a prototype in 7–10 business days. Make changes before bulk production.",
    },
    {
      number: "3",
      title: "Launch with Confidence",
      description: "Receive your finished products in 30 days — ready to sell.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 py-20 px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full transform translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400 rounded-full transform -translate-x-40 translate-y-40" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-white/20 rounded-full text-white font-semibold text-sm uppercase tracking-wider border border-white/30">
            THE PLAN
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-8 mb-6">
            Your Path to Stress-Free Manufacturing
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            From concept to delivery, we&apos;ve streamlined the entire process
            into three simple steps.
          </p>
        </div>

        {/* 3-Step Process */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg p-8 h-full ">
                {/* Step Number Badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white text-3xl font-bold ">
                    {step.number}
                  </div>
                </div>

                <div className="mt-8 text-center">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-white opacity-50" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Section - Transformation */}
      <div className="relative max-w-7xl mx-auto mt-16 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Picture This
        </h3>
        <div className="grid md:grid-cols-3 gap-8 mb-6 text-balance capitalize">
          <div className="backdrop-blur-sm rounded-lg p-6 bg-white/80 font-semibold ">
            <p className="text-gray-800 text-lg font-semibold">
              Your orders arrive exactly when you need them
            </p>
          </div>
          <div className="backdrop-blur-sm rounded-lg p-6 bg-white/80 font-semibold ">
            <p className="text-gray-800 text-lg font-semibold">
              Every piece meets your standards no surprises
            </p>
          </div>
          <div className="backdrop-blur-sm rounded-lg p-6 bg-white/80 font-semibold ">
            <p className="text-gray-800 text-lg font-semibold">
              A partner who actually responds and follows through
            </p>
          </div>
        </div>
        <p className="text-xl text-white font-semibold mt-6">
          That&apos;s exactly what working with Ferrati Sports feels like.
        </p>
      </div>

      {/* Final Call to Action */}
      <div className="relative max-w-7xl mx-auto mt-12 text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Stop Dealing with Unreliable Factories
        </h3>
        <p className="text-xl text-white/90 mb-6">
          Let&apos;s manufacture your next collection — the way it should be
          done.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/request-quote">
            <button className="px-8 py-4 bg-white text-orange-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all">
              Get Your Free Quote
            </button>
          </a>
          <a
            href="https://wa.me/yourwhatsappnumber"
            rel="noopener noreferrer"
            target="_blank"
          >
            <button className="px-8 py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-all">
              Chat on WhatsApp
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
