import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function Logo() {
  const Router = useRouter();
  return (
    <Image
      onClick={() => Router.push("/")}
      style={{ cursor: "pointer" }}
      width={200}
      height={35}
      src="/images/grerza-white.png"
      alt="grerza"
    ></Image>
  );
}

export default Logo;
