import { IWork } from "@/types/woks.type";
import Image from "next/image";
import { notFound } from "next/navigation";

import AddButton from "@/components/workDetails/readButton";

interface IWorkDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getWorks = async () => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch works data");
  }

  return response.json();
};

const WorkDetailsPage = async ({
  params,
}: IWorkDetailsPageProps) => {
  const { id } = await params;

  const worksData: IWork[] = await getWorks();

  const work = worksData.find(
    (item) =>
      String(item.id) === String(id)
  );

  if (!work) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0d0e11] px-4 py-10 text-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* Image */}
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={work.image}
              alt={work.name}
              width={700}
              height={700}
              className="h-[450px] w-full object-cover md:h-[600px]"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-extrabold uppercase md:text-5xl">
              {work.name}
            </h1>

            <p className="mt-4 text-base leading-7 text-gray-400">
              {work.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-5 flex flex-wrap gap-3">
              {work.muscleGroups.map(
                (muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-lime-400 px-4 py-2 text-sm font-bold text-black"
                  >
                    {muscle}
                  </span>
                )
              )}
            </div>

            {/* Information */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-[#252832] bg-[#15171e]">

              <div className="flex justify-between border-b border-[#252832] px-5 py-4">
                <span className="text-xs font-bold uppercase text-gray-500">
                  Equipment
                </span>
                <span>{work.equipment}</span>
              </div>

              <div className="flex justify-between border-b border-[#252832] px-5 py-4">
                <span className="text-xs font-bold uppercase text-gray-500">
                  Difficulty
                </span>
                <span>{work.difficulty}</span>
              </div>

              <div className="flex justify-between border-b border-[#252832] px-5 py-4">
                <span className="text-xs font-bold uppercase text-gray-500">
                  Sets
                </span>
                <span>{work.sets}</span>
              </div>

              <div className="flex justify-between border-b border-[#252832] px-5 py-4">
                <span className="text-xs font-bold uppercase text-gray-500">
                  Reps
                </span>
                <span>{work.reps}</span>
              </div>

              <div className="flex justify-between border-b border-[#252832] px-5 py-4">
                <span className="text-xs font-bold uppercase text-gray-500">
                  Duration
                </span>
                <span>{work.duration} min</span>
              </div>

              <div className="flex justify-between border-b border-[#252832] px-5 py-4">
                <span className="text-xs font-bold uppercase text-gray-500">
                  Calories
                </span>
                <span>
                  {work.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex justify-between px-5 py-4">
                <span className="text-xs font-bold uppercase text-gray-500">
                  Rating
                </span>
                <span>⭐ {work.rating}</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-7">
              <h2 className="text-sm font-bold uppercase tracking-wider">
                Instructions
              </h2>

              {/* <div className="mt-4 space-y-3">
                {work.instructions.map(
                  (instruction:IWork, ind:number) => (
                    <div
                      key={ind}
                      className="flex gap-3 text-sm leading-6 text-gray-400"
                    >
                      <span>{ind + 1}.</span>

                      <p>{instruction.instructions}</p>
                    </div>
                  )
                )}
              </div> */}
            </div>

            {/* Add / Save */}
            <AddButton work={work} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkDetailsPage;