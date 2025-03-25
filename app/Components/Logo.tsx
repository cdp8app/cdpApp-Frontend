import React from "react";
import "../../app/globals.css";
import Image from "next/image";
import Logo1 from "../../public/Images/Logo1.png";

const Logo = () => {
  return (
    <div className="w-[100%] mb-0 flex justify-center">
      {/* <p className="font-sans text-[20px] font-bold text-Black1">Your Logo</p> */}
      <Image
        src={Logo1}
        alt="Logo1"
        className="h-[75px] w-[75px]"
      />
    </div>
  );
};

export default Logo;
