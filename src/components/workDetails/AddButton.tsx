"use client";

import React from "react";
import { IWork } from "@/types/woks.type";
import { useFitLog } from "@/context/FitLogContext";

interface IAddButtonProps {
  work: IWork;
}

const AddButton = ({ work }: IAddButtonProps) => {
  const { plan, addToPlan } = useFitLog();

  const alreadyAdded = plan.some((item) => item.id === work.id);

  const handleAddToPlan = () => {
    addToPlan(work);
  };

  return (
    <button
      onClick={handleAddToPlan}
      disabled={alreadyAdded}
      className="rounded-xl bg-primary px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {alreadyAdded ? "Added to Plan" : "Add to Plan"}
    </button>
  );
};

export default AddButton;