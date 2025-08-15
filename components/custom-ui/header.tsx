import Separator from "../separator";

interface HeaderProps {
  badge?: string;
  title?: string;
  highlightedTitle?: string;
  subtitle?: string;
  theme?: "light" | "dark";
  leftAlign?: boolean;
}

export default function Header({
  theme = "light",
  badge,
  title,
  highlightedTitle,
  subtitle,
  leftAlign = false,
}: HeaderProps) {
  // Define color classes based on theme
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const subtitleColor = theme === "dark" ? "text-gray-100" : "text-gray-600";
  const badgeBg =
    theme === "dark"
      ? "bg-gradient-to-r from-orange-400 to-yellow-400 border-orange-400"
      : "bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-orange-500/30";
  const badgeText = theme === "dark" ? "text-white" : "text-orange-600";

  return (
    <div
      className={`
        mb-16 mt-20 mx-2 ${textColor}
        ${leftAlign ? "text-left ml-[5%] md:ml-[2%]" : "text-center"}
      `}
    >
      {badge && (
        <div className={leftAlign ? "block" : "inline-block mb-4"}>
          <span
            className={`px-4 py-2 ${badgeBg} rounded-full ${badgeText} font-semibold text-sm uppercase tracking-wider border`}
          >
            {badge}
          </span>
        </div>
      )}

      <h2
        className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${textColor}`}
      >
        {title}{" "}
        <span
          className={`bg-clip-text ${theme === "dark" ? "text-white" : "text-orange-500"}`}
        >
          {highlightedTitle}
        </span>
      </h2>

      <Separator bg={theme === "dark" ? "white" : "accent"} />

      <p
        className={`
          text-lg md:text-2xl leading-relaxed ${subtitleColor}
          ${leftAlign ? "pr-[10%]" : "mx-auto px-[10%]"}
        `}
      >
        {subtitle}
      </p>
    </div>
  );
}
