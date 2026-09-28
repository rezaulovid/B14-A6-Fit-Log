"use client"
import { FitsContext } from '@/context/FitLogContext';
import React, { useContext } from 'react';

const ListedWorkouts = () => {
    const {readWorkouts} = useContext(FitsContext)
    console.log(readWorkouts ,"readWorkouts" )
    return (
        <div>
            listed-workouts
        </div>
    );
};

export default ListedWorkouts;