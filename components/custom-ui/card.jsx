import { Image } from "@heroui/image";
import Link from "next/link";

export default function Card({
  title,
  description,
  image,
  children,
  href = "#",
}) {
  const placeholder = "https://heroui.com/images/album-cover.png";

  return (
    <div style={{ padding: 5 }}>
      <Link href={href}>
        {/* YouTube Video Embed */}
        <Image
          isZoomed
          isBlurred
          alt="Card Cover"
          className="w-full h-80 object-cover rounded-2xl"
          width={700}
          height={300}
          src={image || placeholder}
        />

        {/* Video Title and Description */}
        <div className="text-left py-3 capitalize lg:text-left space-y-2 animate-fade-in delay-200">
          {title && (
            <h3 className="text-3xl  font-bold text-gray-900 hover:text-orange-600 transition-colors duration-300">
              {title}
            </h3>
          )}
          {description && description !== "" && (
            <p className="text-gray-600 text-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </Link>
      <div>{children && children}</div>
    </div>
  );
}
