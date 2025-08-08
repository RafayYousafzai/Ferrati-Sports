import { Image } from "@heroui/image";
import Link from "next/link";

export default function Card({
  title = "title",
  description,
  image = "https://heroui.com/images/album-cover.png",
  children,
  href = "#",
}) {
  return (
    <div style={{ padding: 5 }}>
      <Link href={href}>
        {/* YouTube Video Embed */}
        <Image
          isZoomed
          isBlurred
          alt="Album Cover"
          className="w-[88vw] md:w-2xl h-80 object-cover"
          src={image}
        />

        {/* Video Title and Description */}
        <div className="text-left py-3 capitalize lg:text-left space-y-2 animate-fade-in delay-200">
          <h3 className="text-3xl  font-bold text-gray-900 hover:text-orange-600 transition-colors duration-300">
            {title}
          </h3>
          {description && (
            <p className="text-gray-600 text-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </Link>
      <div>{children}</div>
    </div>
  );
}
