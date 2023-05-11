import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function Logo() {
  const Router = useRouter();
  return (
    <Image
      onClick={() => Router.push("/")}
      style={{ cursor: "pointer" }}
      fill
      objectFit="cover"
      src="/images/LogoGrerza.png"
      alt="grerza"
    ></Image>
  );
}

export default Logo;
