"use client";

import React from "react";
import { toast } from "react-toastify";

import { IWork } from "@/types/woks.type";
import { useFitLog } from "@/context/FitLogContext";

interface IAddButtonProps {
  work: IWork;
}

const AddButton = ({ work }: IAddButtonProps) => {
  const {
    plan,
    saved,
    addToPlan,
    toggleSaved,
  } = useFitLog();

  const alreadyInPlan = plan.some(
    (item) =>
      String(item.id) === String(work.id)
  );

  const alreadySaved = saved.some(
    (item) =>
      String(item.id) === String(work.id)
  );

  const handleAddToPlan = () => {
    if (alreadyInPlan) {
      toast.info("Already added to today's plan");
      return;
    }

    if (plan.length >= 5) {
      toast.warning(
        "You can add maximum 5 exercises."
      );
      return;
    }

    addToPlan(work);

    toast.success("Added to today's plan");
  };

  const handleSaveForLater = () => {
    toggleSaved(work);

    if (alreadySaved) {
      toast.info("Removed from saved");
    } else {
      toast.success("Saved for later");
    }
  };

  return (
    <div className="mt-7  flex flex-wrap gap-3">
      <button
        onClick={handleAddToPlan}
        className="rounded-xl bg-lime-400 px-6 py-3 font-bold text-black transition hover:opacity-90"
      >
        {alreadyInPlan
          ? "Added to today's plan"
          : "Add to today's plan"}
      </button>

      <button
        onClick={handleSaveForLater}
        className="rounded-xl border border-[#30343d] bg-[#15171e] px-6 py-3 text-gray-300 transition hover:bg-[#20232b]"
      >
        {alreadySaved
          ? "Saved"
          : "♡ Save for later"}
      </button>
    </div>
  );
};

export default AddButton;