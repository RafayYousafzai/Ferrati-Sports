"use client";
import { TypeAnimation } from "react-type-animation";

export default function TypeEffect({ sequence }) {
  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{
        fontSize: "3em",
        display: "inline-block",
        fontWeight: "bold",
      }}
    />
  );
}
