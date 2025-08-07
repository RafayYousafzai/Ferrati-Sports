"use client";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category?: string;
}

interface VideoShowcaseProps {
  videos: VideoItem[];
  className?: string;
}

// Helper function to extract YouTube ID from various URL formats
function extractYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
}

export default function VideoShowcase({
  videos,
  className = "",
}: VideoShowcaseProps) {
  return (
    <section className={` px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Video Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="space-y-6 transform transition-all duration-500 hover:-translate-y-2"
            >
              {/* Category Label - positioned above left video */}
              {index === 0 && video.category && (
                <div className="text-left lg:text-left mb-4 animate-fade-in">
                  <span className="text-orange-600 font-semibold text-base tracking-wide">
                    <span className="text-orange-600 font-extrabold">
                      Creative
                    </span>{" "}
                    storytelling and branding.
                  </span>
                </div>
              )}

              {/* YouTube Video Embed */}
              <div className="relative group rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(video.youtubeId)}?rel=0&modestbranding=1&showinfo=0`}
                    title={video.title}
                    className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Gradient Border Effect */}
                <div className="absolute -inset-px bg-gradient-to-r from-orange-600/30 to-red-600/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>

              {/* Video Title and Description */}
              <div className="text-left lg:text-left space-y-2 animate-fade-in delay-200">
                <h3 className="text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors duration-300">
                  {video.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {video.description}
                </p>
              </div>

              {/* Category Label - positioned below right video */}
              {index === 1 && video.category && (
                <div className="text-left lg:text-left animate-fade-in delay-300">
                  <span className="text-gray-700 font-semibold text-base tracking-wide">
                    Flawless{" "}
                    <span className="text-orange-600 font-extrabold">
                      digital marketing
                    </span>{" "}
                    execution.
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
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
      `}</style>
    </section>
  );
}
