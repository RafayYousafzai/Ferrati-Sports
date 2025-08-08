import Image from "next/image";

type PropsType = {
  containerStyles: string;
};

const Badge = ({ containerStyles }: PropsType) => {
  return (
    <div className={`relative ${containerStyles}`}>
      <Image fill alt="" className="object-contain" src="/assets/logo.png" />
    </div>
  );
};

export default Badge;
