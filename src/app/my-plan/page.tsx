"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

import { useFitLog } from "@/context/FitLogContext";
import { IWork } from "@/types/woks.type";

type Tab = "plan" | "saved";

const MyPlanPage = () => {
  const {
    plan,
    saved,
    loading,
    removeFromPlan,
    markAsDone,
    toggleSaved,
  } = useFitLog();

  const [activeTab, setActiveTab] =
    useState<Tab>("plan");

  const currentWorkouts =
    activeTab === "plan" ? plan : saved;

  const totalExercises =
    currentWorkouts.length;

  const totalMinutes =
    currentWorkouts.reduce(
      (total, workout) =>
        total + workout.duration,
      0
    );

  const totalCalories =
    currentWorkouts.reduce(
      (total, workout) =>
        total + workout.caloriesBurned,
      0
    );

  const handleRemove = (id: number) => {
    removeFromPlan(id);
    toast.info("Workout removed from today's plan");
  };

  const handleDone = (id: number) => {
    markAsDone(id);
    toast.success("Workout marked as done");
  };

  const handleRemoveSaved = (workout: IWork) => {
    toggleSaved(workout);
    toast.info("Removed from saved");
  };

  return (
    <main className="min-h-screen  bg-[#0d0e11] px-4 py-12 text-white">
      <div className="container mx-auto max-w-6xl">

    
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-gray-400">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>
        </div>

       
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

       
          <div className="rounded-2xl border border-[#252832] bg-[#15171e] p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Exercises
            </p>

            <p className="mt-3 text-3xl font-extrabold">
              {totalExercises}
            </p>
          </div>

        
          <div className="rounded-2xl border border-[#252832] bg-[#15171e] p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Minutes
            </p>

            <p className="mt-3 text-3xl font-extrabold">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="rounded-2xl border border-[#252832] bg-[#15171e] p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Calories
            </p>

            <p className="mt-3 text-3xl font-extrabold">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 border-b border-[#252832]">
          <div className="flex gap-8">

            <button
              onClick={() => setActiveTab("plan")}
              className={`pb-4 text-sm font-bold uppercase transition ${
                activeTab === "plan"
                  ? "border-b-2 border-lime-400 text-lime-400"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Todays Plan
              <span className="ml-2">
                ({plan.length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`pb-4 text-sm font-bold uppercase transition ${
                activeTab === "saved"
                  ? "border-b-2 border-lime-400 text-lime-400"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Saved
              <span className="ml-2">
                ({saved.length})
              </span>
            </button>

          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            Loading workouts…
          </div>
        ) : currentWorkouts.length === 0 ? (
          /* Empty State */
          <div className="py-24 text-center">

            <h2 className="text-2xl font-extrabold">
              NOTHING HERE YET
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-400">
              Browse the library and add a lift to
              get today moving.
            </p>

            <Link
              href="/"
              className="mt-7 inline-block rounded-xl bg-lime-400 px-6 py-3 font-bold text-black transition hover:opacity-90"
            >
              Go to workouts
            </Link>

          </div>
        ) : (
          /* Workout List */
          <div className="mt-8 space-y-5">

            {currentWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="overflow-hidden rounded-2xl border border-[#252832] bg-[#15171e]"
              >
                <div className="flex flex-col md:flex-row">

                  {/* Thumbnail */}
                  <div className="relative h-56 w-full shrink-0 md:h-auto md:w-64">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between p-5 md:p-6">

                    <div>
                      <h2 className="text-2xl font-extrabold uppercase">
                        {workout.name}
                      </h2>

                      <p className="mt-2 text-sm text-gray-400">
                        {workout.equipment}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-5 flex flex-wrap gap-5 text-sm text-gray-300">

                      <span>
                        ⏱ {workout.duration} min
                      </span>

                      <span>
                        🔥 {workout.caloriesBurned} kcal
                      </span>

                      <span>
                        ⭐ {workout.rating}
                      </span>

                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap gap-3">

                      <Link
                        href={`/workouts/${workout.id}`}
                        className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-bold text-black transition hover:opacity-90"
                      >
                        View Details
                      </Link>

                      {activeTab === "plan" ? (
                        <>
                          <button
                            onClick={() =>
                              handleDone(workout.id)
                            }
                            className="rounded-lg border border-lime-400 px-4 py-2 text-sm font-bold text-lime-400 transition hover:bg-lime-400 hover:text-black"
                          >
                            Mark as Done
                          </button>

                          <button
                            onClick={() =>
                              handleRemove(workout.id)
                            }
                            className="rounded-lg border border-[#30343d] px-4 py-2 text-sm font-bold text-gray-400 transition hover:border-red-500 hover:text-red-400"
                          >
                            X Remove
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() =>
                            handleRemoveSaved(workout)
                          }
                          className="rounded-lg border border-[#30343d] px-4 py-2 text-sm font-bold text-gray-400 transition hover:border-red-500 hover:text-red-400"
                        >
                          X Remove
                        </button>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </main>
  );
};

export default MyPlanPage;