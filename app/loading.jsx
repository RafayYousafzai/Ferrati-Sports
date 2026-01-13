"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-orange-50 dark:from-gray-900 dark:via-black dark:to-blue-950">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" /> */}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Video container with enhanced styling */}
        <div className="relative">
          {/* Video container */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/50 dark:border-gray-800/50">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/assets/t-shirt.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Loading text with animation */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-black dark:text-white animate-pulse">
            We Make. You Win.
          </h2>
          {/* Progress bar */}
          {/* <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-blue-500 dark:to-purple-500 animate-progress" />
          </div> */}
          {/* Animated dots */}
          {/* <div className="flex items-center justify-center gap-2">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-orange-500 dark:bg-blue-500 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-orange-500 dark:bg-blue-500 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-orange-500 dark:bg-blue-500 rounded-full animate-bounce delay-200" />
            </div>
          </div> */}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-slower {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-spin-slower {
          animation: spin-slower 4s linear infinite;
        }

        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
}
