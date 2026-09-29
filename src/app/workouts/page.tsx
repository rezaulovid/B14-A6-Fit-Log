import React from 'react';
import Image from "next/image";

import { IWork } from '@/types/woks.type';
import WorkCard from '../../components/shared/WorkCard';

const getWorks = async () => {
  const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await response.json();
  return data;
};

const Works = async () => {
  const worksData = await getWorks();

  console.log(worksData, "worksData");

  return (
    <section className="container mx-auto my-[70px] px-4">

      {/* Section Heading */}
      <div className="mb-10 bg-black so it aligns to the left[cite: 8, 9]">
       
        <h2 className="text-3xl font-bold md:text-4xl">
          <span className="text-primary  text-white"> THE LIBARY</span>
        </h2>

        <p className="mt-3 max-w-2xl text-white so it aligns to the left[cite: 8, 9]">
          Tewlve lifts covering every major muscle group
        </p>
      </div>

      {/* Works Cards */}
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

        {worksData.map((work:IWork, ind:number) => {
          return <WorkCard key={ind} work={work} />;
      
        })}
 </div>
</section>
  );
};

export default Works;
