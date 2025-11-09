"use client";
import { TypeAnimation } from "react-type-animation";

export default function TypeEffect() {
  return (
    <TypeAnimation
      cursor={true}
      repeat={Infinity}
      sequence={["", 2000, "", 2000, "", 2000]}
      speed={30} // 🔹 Lower = slower (default is 40, try 50–80 for natural pace)
      style={{
        fontSize: "3em",
        display: "inline-block",
        fontWeight: "bold",
      }}
      wrapper="span"
    />
  );
}
