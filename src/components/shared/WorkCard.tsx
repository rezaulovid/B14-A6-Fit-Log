import { IWork } from '@/types/woks.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IWorkCardProps {
   work:IWork;
}
const WorkCard =  ({work}:IWorkCardProps) => {
    return (
         <div
                    
                     className="group overflow-hidden rounded-2xl border border-black bg-black shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                   >
       
                     {/* Image */}
                     <div className="relative h-60 w-full overflow-hidden">
       
                       <Image
                          src={work.image}
                         alt={work.name}
                         fill
                         className="object-cover transition duration-500 group-hover:scale-110"
                       />
       
                       {/* Difficulty Badge */}
                       <div className="absolute left-4 top-4">
                         <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-800 shadow backdrop-blur">
                           {work.difficulty}
                         </span>
                       </div>
       
                       {/* Rating */}
                       <div className="absolute right-4 top-4">
                         <span className="rounded-full bg-black/70 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
                           ⭐ {work.rating}
                         </span>
                       </div>
       
                     </div>
       
                     {/* Card Content */}
                     <div className="p-5">
       
                       {/* Exercise Name */}
                       <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-primary">
                         {work.name}
                       </h3>
       
                       {/* Muscle Groups */}
                       <div className="mt-3 flex flex-wrap gap-2">
                         {work.muscleGroups.map((muscle) => {
                           return (
                             <span
                               key={muscle}
                               className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                             >
                               {muscle}
                             </span>
                           );
                         })}
                       </div>
       
                       {/* Workout Info */}
                       <div className="mt-5 grid grid-cols-2 gap-3">
       
                         <div className="rounded-xl bg-gray-50 p-3">
                           <p className="text-xs text-gray-500">Duration</p>
                           <p className="mt-1 font-bold text-gray-800">
                             ⏱ {work.duration} min
                           </p>
                         </div>
       
                         <div className="rounded-xl bg-gray-50 p-3">
                           <p className="text-xs text-gray-500">Calories</p>
                           <p className="mt-1 font-bold text-gray-800">
                             🔥 {work.caloriesBurned} kcal
                           </p>
                         </div>
       
                         <div className="rounded-xl bg-gray-50 p-3">
                           <p className="text-xs text-gray-500">Sets</p>
                           <p className="mt-1 font-bold text-gray-800">
                             💪 {work.sets}
                           </p>
                         </div>
       
                         <div className="rounded-xl bg-gray-50 p-3">
                           <p className="text-xs text-gray-500">Reps</p>
                           <p className="mt-1 font-bold text-gray-800">
                             🔁 {work.reps}
                           </p>
                         </div>
       
                       </div>
       
                       {/* Equipment */}
                       <div className="mt-5">
                         <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                           Equipment
                         </p>
       
                         <p className="mt-1 text-sm font-medium text-gray-700">
                           {work.equipment}
                         </p>
                       </div>
       
                       {/* Description */}
                       <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">
                         {work.description}
                       </p>
       
                    {/* Button */}
                <Link href={`/workouts/${work.id}`}>
            <button className="btn btn-primary mt-5 w-full
             rounded-xl text-white">
              View Workout
              </button>
                 </Link>
       
                     </div>
                   </div>
    );
};

export default WorkCard;