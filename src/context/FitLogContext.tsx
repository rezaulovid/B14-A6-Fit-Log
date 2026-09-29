"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { IWork } from "@/types/woks.type";

interface IFitLogContext {
  plan: IWork[];
  saved: IWork[];
  loading: boolean;

  addToPlan: (workout: IWork) => void;
  removeFromPlan: (id: string | number) => void;
  toggleSaved: (workout: IWork) => void;
  markAsDone: (id: string | number) => void;
}

const FitLogContext = createContext<IFitLogContext | undefined>(
  undefined
);

export const FitLogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [plan, setPlan] = useState<IWork[]>([]);
  const [saved, setSaved] = useState<IWork[]>([]);
  const [loading, setLoading] = useState(true);

  // Load plan and saved workouts from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const savedWorkouts = localStorage.getItem("fitlog-saved");

    if (savedPlan) {
      try {
        setPlan(JSON.parse(savedPlan));
      } catch {
        setPlan([]);
      }
    }

    if (savedWorkouts) {
      try {
        setSaved(JSON.parse(savedWorkouts));
      } catch {
        setSaved([]);
      }
    }

    setLoading(false);
  }, []);

  // Save today's plan
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(plan)
      );
    }
  }, [plan, loading]);

  // Save saved workouts
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(saved)
      );
    }
  }, [saved, loading]);

  // Add workout to today's plan
  const addToPlan = (workout: IWork) => {
    if (plan.length >= 5) {
      return;
    }

    const alreadyAdded = plan.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadyAdded) {
      return;
    }

    setPlan((previous) => [
      ...previous,
      workout,
    ]);
  };

  // Remove workout from today's plan
  const removeFromPlan = (id: string | number) => {
    setPlan((previous) =>
      previous.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  // Save / unsave workout
  const toggleSaved = (workout: IWork) => {
    const exists = saved.some(
      (item) =>
        String(item.id) === String(workout.id)
    );

    if (exists) {
      setSaved((previous) =>
        previous.filter(
          (item) =>
            String(item.id) !== String(workout.id)
        )
      );
    } else {
      setSaved((previous) => [
        ...previous,
        workout,
      ]);
    }
  };

  // Mark workout as completed
  const markAsDone = (id: string | number) => {
    setPlan((previous) =>
      previous.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        loading,
        addToPlan,
        removeFromPlan,
        toggleSaved,
        markAsDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
};