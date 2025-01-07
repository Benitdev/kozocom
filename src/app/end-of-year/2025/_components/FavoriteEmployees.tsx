"use client";

import Image from "next/image";
import { EMPLOYEES } from "~/constants/end-of-year-2025";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { Spotlight } from "~/components/ui/sportlight";

export const FavoriteEmployees = () => {
  const [resultStage, setResultStage] = useState(1);
  const [randomProgress, setRandomProgress] = useState(
    EMPLOYEES.map((employee) => ({
      ...employee,
      currentProgress: 0, // Start progress at 0
      maxProgress: parseFloat(employee.progress), // Convert progress from string to number
    }))
  );

  useEffect(() => {
    if (!resultStage) return;
    const interval = setInterval(() => {
      setRandomProgress((prevState) =>
        prevState.map((employee) => {
          const shouldIncrease =
            Math.random() >
            (employee.maxProgress > 20
              ? 0.2
              : 1 - (employee.maxProgress + 10) / 100);
          if (shouldIncrease)
            return {
              ...employee,
              currentProgress: Math.min(
                employee.maxProgress,
                employee.currentProgress + Math.random() // Increment randomly
              ),
            };
          return employee;
        })
      );
    }, 300);

    return () => clearInterval(interval);
  }, [resultStage]);

  useEffect(() => {
    if (randomProgress.some((employee) => employee.currentProgress > 20))
      setResultStage(2);
    if (
      randomProgress.every(
        (employee) => employee.currentProgress === employee.maxProgress
      )
    )
      setResultStage(3);
  }, [randomProgress]);

  const isShowOnlyTwo = resultStage >= 2;
  const isShowWinner = resultStage >= 3;

  if (!isShowOnlyTwo)
    randomProgress.sort((a, b) => b.currentProgress - a.currentProgress);

  if (isShowOnlyTwo) randomProgress.splice(2);

  return (
    <>
      <div
        className={cn("relative mx-auto !-mt-20 grid max-w-screen-lg gap-4", {
          "!-mt-10 grid-cols-2 place-items-center": isShowOnlyTwo,
        })}
      >
        {randomProgress.map((employee, index) => (
          <motion.div
            layoutId={employee.avatar}
            key={employee.avatar}
            transition={{
              duration: 0.5,
            }}
            animate={{
              scale:
                isShowWinner &&
                employee.avatar === "/images/end-of-year-2025/Top1.jpg"
                  ? 1.2
                  : 1,
            }}
            className={cn("flex items-center gap-2 font-sans", {
              "flex-col": isShowOnlyTwo,
            })}
          >
            <div className="flex items-end gap-2">
              {!isShowOnlyTwo && (
                <span className="w-7 text-xl font-bold italic tracking-wider text-[#ffe2ac]">
                  {index + 1}
                  {"."}
                </span>
              )}
              <div
                className={cn(
                  "relative grid h-[50px] w-[50px] place-items-center rounded-full bg-gradient-to-r from-[#ffe2ac] via-[#7a410a] to-yellow-800 p-[2px] brightness-105",
                  {
                    "ml-0 h-[300px] w-[300px] rounded-lg p-1": isShowOnlyTwo,
                  }
                )}
              >
                <Image
                  src={employee.avatar}
                  width={isShowOnlyTwo ? 300 : 40}
                  height={isShowOnlyTwo ? 300 : 40}
                  alt="avatar"
                  className={cn(
                    "h-full w-full overflow-hidden rounded-full object-cover",
                    {
                      "ml-0 rounded-lg border-2 border-black": isShowOnlyTwo,
                    }
                  )}
                />
                {isShowWinner &&
                  employee.avatar === "/images/end-of-year-2025/Top1.jpg" && (
                    <motion.div
                      className="absolute left-0 top-0 flex items-center gap-2 text-xl font-bold tracking-wider text-[#fcb65a]"
                      initial={{
                        opacity: 0,
                        rotate: -45,
                        x: 600,
                        y: -600,
                      }}
                      animate={{
                        opacity: 1,
                        x: -20,
                        y: -20,
                        scale: [1, 1.5, 1.2],
                      }}
                      transition={{
                        scale: {
                          repeat: Infinity,
                        },
                      }}
                    >
                      <p className="rounded-lg border border-[#db6b21] bg-black/60 p-2 backdrop-blur-lg">
                        WINNER
                      </p>
                      <Image
                        src={"/images/end-of-year-2025/award.png"}
                        width={50}
                        height={50}
                        alt="cup"
                      />
                    </motion.div>
                  )}
              </div>
            </div>
            {!isShowOnlyTwo ? (
              <div className="relative ml-2 flex h-3 flex-1 items-center">
                <div>
                  <div className="progress-infinite absolute bottom-0 left-0 right-0 h-2">
                    <div
                      className="progress-bar3 rounded-r-xl"
                      style={{
                        width: `calc(${employee.currentProgress}% * 1.7)`,
                      }}
                    ></div>
                  </div>
                </div>
                <motion.p
                  style={{
                    left: `calc(${employee.currentProgress}% * 1.7)`,
                  }}
                  className={cn(
                    "absolute text-xl font-bold italic tracking-wider text-[#ffe2ac]",
                    {
                      "ml-3": resultStage === 1,
                    }
                  )}
                >
                  {employee.name}
                  <span className="ml-3 text-base font-bold italic tracking-wider text-[#f87224]">
                    {employee.currentProgress.toFixed(2)}%
                  </span>
                </motion.p>
              </div>
            ) : (
              <div>
                <motion.p className="text-center text-2xl font-bold italic tracking-wider text-[#ffe2ac]">
                  {employee.name}
                </motion.p>
                <motion.p className="text-center text-3xl font-bold italic tracking-wider text-[#f7a223]">
                  {employee.currentProgress.toFixed(2)}%
                </motion.p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      {isShowOnlyTwo && (
        <>
          <Spotlight
            className="left-0 top-40 animate-spotlight md:-top-24 md:left-60"
            fill="#ffe2ac"
          />
          <Spotlight
            className="animate-spotlight-reverse right-0 top-40 md:-top-24 md:right-60"
            fill="#ffe2ac"
          />
        </>
      )}
    </>
  );
};
