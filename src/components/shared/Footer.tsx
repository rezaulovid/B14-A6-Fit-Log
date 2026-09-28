import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#090a0c] border-t border-[#202329] px-6 py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">


        <div className="flex items-center gap-4">
          <Image
            src={logo}
            alt="FitLog Logo"
            width={24}
            height={24}
          />

          <span className="text-white font-bold tracking-wide">
            FITLOG
          </span>
        </div>

    
        <p className="text-[#5d6570] text-xs text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;