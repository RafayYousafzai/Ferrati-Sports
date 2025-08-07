import { Image } from "@heroui/image";
import Link from "next/link";

export default function Card({
  title = "title",
  description = "description",
  image = "https://heroui.com/images/album-cover.png",
}) {
  return (
    <div className="m-5">
      <Link href="https://www.youtube.com/watch?v=example">
        {/* YouTube Video Embed */}
        <Image
          isZoomed
          isBlurred
          alt="HeroUI Album Cover"
          className="w-[90vw] md:w-80 h-64"
          src={image}
        />

        {/* Video Title and Description */}
        <div className="text-left mt-3 capitalize lg:text-left space-y-2 animate-fade-in delay-200">
          <h3 className="text-3xl  font-bold text-gray-900 hover:text-orange-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
        </div>
      </Link>
    </div>
  );
}
