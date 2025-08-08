import Image from "next/image";

const Separator = ({
  bg = "white",
  className,
}: {
  bg?: "accent" | "white";
  className?: string;
}) => {
  const imgSrc =
    bg === "accent"
      ? "/assets/separator-accent.svg"
      : "/assets/separator-white.svg";

  return (
    <div className={`relative w-[168px] h-[26px] mx-auto ${className}`}>
      <Image fill alt="" src={imgSrc} />
    </div>
  );
};

export default Separator;
