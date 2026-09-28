import Image from 'next/image';
import React from 'react';
import logo from '@/assets/logo.png'
import Link from 'next/link';
const Navbar = () => {
    return (
       <nav className="bg-[#0d0e12]" >
       <div className="navbar   shadow-sm container mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
    
    </div>
    <div className="flex gap-2 items-center font-bold text-white text-xl">
    <Image src={logo} alt='logo'/>
     FITLOG</div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal  text-white px-1">
     <Link href={"/workouts"} >Workouts</Link> 
     </ul>
      <li>
      </li><ul className="menu menu-horizontal  text-white px-1">
      <li>  <Link href={"/listed-workouts"} >My Plan</Link></li>
    </ul>
  </div>
  <div className="navbar-end  gap-2">
    <button className="btn">Plan</button>
    <button className="btn">Saved</button>
  </div>
</div>
</nav>
    );
};

export default Navbar;