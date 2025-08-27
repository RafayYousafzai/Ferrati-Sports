"use client";
import { TypeAnimation } from "react-type-animation";

export default function TypeEffect() {
  return (
    <TypeAnimation
      sequence={["We Own It.", 2000, "We Build.", 2000, "We Deliver.", 2000]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      speed={30} // 🔹 Lower = slower (default is 40, try 50–80 for natural pace)
      style={{
        fontSize: "3em",
        display: "inline-block",
        fontWeight: "bold",
      }}
    />
  );
}
