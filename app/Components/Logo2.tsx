import React from "react";
import "../../app/globals.css";
import Image from "next/image";
import Logo2Image from "../../public/Images/Logo2.png";

export default function LogoComponent() {
  return (
    <div className="mb-0 flex">
      <Image
        src={Logo2Image}
        alt="Logo2"
        className=""
      />
    </div>
  );
};
