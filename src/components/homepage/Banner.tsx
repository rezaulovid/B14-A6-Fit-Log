import Image from 'next/image';
import React from 'react';
import bannerImg from '@/assets/banner.png'
const Banner = () => {
    return (
        <section className=' rounded-4xl p-4'>

     <div className="container mx-auto grid grid-cols-2 gap-4
         items-center  bg-black rounded-4xl p-4" >
            <div className='text-white space-y-4'>
             <h2>WORKOUT LIBRARY</h2>
             <h2 className='font-bold text-3xl'>
                 TRAIN WITH INTENT. <br/> LOG EVERY SET.
             </h2>
             <p>FitLog is a dark, no-nonsense gym companion:
                    pick a lift, lock it into today's plan,
                     and watch the week's work add up.</p>
             <button className="btn btn-success" >BROWSE WORKOUTS</button>
            </div>
            <div>
            <Image src={bannerImg} alt='Banner'/>
            </div>
        </div>
        </section>
    );
};

export default Banner;