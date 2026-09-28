"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { IWork } from "@/types/woks.type";
export const FitsContext = createContext({});

interface IFitLogContext {
  plan: IWork[];
  saved: IWork[];
  addToPlan: (workout: IWork) => void;
  removeFromPlan: (id: string) => void;
  toggleSaved: (workout: IWork) => void;
}

const FitLogContext = createContext<IFitLogContext | undefined>(undefined);

export const FitLogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [plan, setPlan] = useState<IWork[]>([]);
  const [saved, setSaved] = useState<IWork[]>([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const savedWorkouts = localStorage.getItem("fitlog-saved");

    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }

    if (savedWorkouts) {
      setSaved(JSON.parse(savedWorkouts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout: IWork) => {
    if (plan.length >= 5) {
      alert("You can add maximum 5 exercises.");
      return;
    }

    const alreadyAdded = plan.some((item) => item.id === workout.id);

    if (alreadyAdded) {
      return;
    }

    setPlan((prev) => [...prev, workout]);
  };

  const removeFromPlan = (id: string) => {
    setPlan((prev) => prev.filter((item) => item.id !== Number(id)));
  };

  const toggleSaved = (workout: IWork) => {
    const exists = saved.some((item) => item.id === workout.id);

    if (exists) {
      setSaved((prev) => prev.filter((item) => item.id !== workout.id));
    } else {
      setSaved((prev) => [...prev, workout]);
    }
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        toggleSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
};



// "use client";

// import React, { createContext, useContext, useState } from "react";
// import { IWork } from "@/types/woks.type";

// interface IFitLogContext {
//   myPlan: IWork[];
//   setMyPlan: React.Dispatch<React.SetStateAction<IWork[]>>;
//   addToPlan: (work: IWork) => void;
//   removeFromPlan: (workId: number) => void;
// }

// export const FitsContext = createContext<IFitLogContext | undefined>(
//   undefined
// );

// export const FitsProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [myPlan, setMyPlan] = useState<IWork[]>([]);

//   const addToPlan = (work: IWork) => {
//     setMyPlan((previous) => {
//       const alreadyExists = previous.some(
//         (item) => item.workId === work.workId
//       );

//       if (alreadyExists) {
//         return previous;
//       }

//       return [...previous, work];
//     });
//   };

//   const removeFromPlan = (workId: number) => {
//     setMyPlan((previous) =>
//       previous.filter((item) => item.workId !== workId)
//     );
//   };

//   return (
//     <FitsContext.Provider
//       value={{
//         myPlan,
//         setMyPlan,
//         addToPlan,
//         removeFromPlan,
//       }}
//     >
//       {children}
//     </FitsContext.Provider>
//   );
// };

// export const useFitLog = () => {
//   const context = useContext(FitsContext);

//   if (!context) {
//     throw new Error(
//       "useFitLog must be used inside FitLogProvider"
//     );
//   }

//   return context;
// };