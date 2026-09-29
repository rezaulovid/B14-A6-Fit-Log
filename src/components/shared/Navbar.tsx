"use client";

import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";

const Navbar = () => {
  const { plan, saved } = useFitLog();

  return (
    <nav className="bg-[#0d0e12]">
      <div className="navbar shadow-sm container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <Image src={logo} alt="logo" />
            FITLOG
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <Link href="/workouts">Workouts</Link>
            </li>
          </ul>

          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <Link href="/my-plan">My Plan</Link>
            </li>
          </ul>
        </div>

       <div className="navbar-end px-1 gap-4">
  <Link href="/my-plan" className="flex items-center gap-2 text-sm text-white">
    My Plan
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
      {plan.length}
    </span>
  </Link>

  <Link href="/my-plan" className="flex items-center gap-2 text-sm text-gray-400">
    Saved
    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-500 text-xs font-bold text-gray-300">
      {saved.length}
    </span>
  </Link>
</div>
      </div>
    </nav>
  );
};

export default Navbar;


