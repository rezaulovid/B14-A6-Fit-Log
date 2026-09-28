"use client";

import { useFitLog } from "@/context/FitLogContext";
import React from "react";

const ListedWorkouts = () => {
  const { plan } = useFitLog();

  console.log(plan, "plan");

  return (
    <div>
      listed-workouts
    </div>
  );
};

export default ListedWorkouts;