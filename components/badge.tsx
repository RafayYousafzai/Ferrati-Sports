import Image from "next/image";

type PropsType = {
  containerStyles: string;
  sqr?: boolean;
};

const Badge = ({ containerStyles, sqr = true }: PropsType) => {
  return (
    <div className={`relative ${containerStyles}`}>
      <Image
        fill
        alt=""
        className="object-contain"
        src={`${sqr ? "/square-logo.png" : "/landscape-logo.png"}`}
      />
    </div>
  );
};

export default Badge;
