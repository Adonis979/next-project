import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <Image
      style={{ backgroundColor: "black" }}
      width={200}
      height={35}
      src="/images/grerza-white.png"
      alt="grerza"
    ></Image>
  );
}

export default Logo;
