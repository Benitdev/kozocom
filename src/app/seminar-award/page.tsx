"use client";

import Image from "next/image";
import { useState } from "react";

import { motion } from "framer-motion";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import PosterList from "~/app/seminar-award/_components/PosterList";
import ImageLibrary from "~/app/seminar-award/_components/ImageLibrary";

import Particles from "~/components/Praticles";

const heading = "Techshare Seminar";

export default function Home() {
  const [trailer, setTrailer] = useState(false);
  const [starting, setStarting] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showOne, setShowOne] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const handleStartClick = () => {
    setStarting(true);
    setTimeout(() => {
      setShowOne(true);
      setTimeout(() => {
        setShowFinal(true);
      }, 5000);
    }, 10000);
  };
  return (
    <>
      <Particles />
      {trailer ? (
        <div className="flex h-screen w-screen flex-col items-center gap-4 overflow-hidden pb-4">
          <header className="flex w-full items-center justify-between px-3">
            <motion.div
              initial={{
                y: -30,
                x: -50,
                opacity: 0,
              }}
              animate={{
                y: 0,
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1,
              }}
            >
              <Image
                src={"/custom-logo-company-white.png"}
                alt=""
                width={200}
                height={40}
              />
            </motion.div>
            <motion.h1
              initial={{
                y: -30,
                x: 50,
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1,
              }}
              className="text-jump my-1 space-x-2 text-[26px] font-extrabold"
            >
              {heading.split("").map((char, index) => (
                <span
                  key={index}
                  style={{
                    animationDelay: `calc(0.1s * ${index + 1})`,
                  }}
                >
                  {char}
                </span>
              ))}
            </motion.h1>
          </header>
          <h1 className="animate-character font-style my-2 text-center text-2xl font-extrabold uppercase leading-none tracking-[5px]">
            Best Seminar Presentation Award 3rd & 4th Quarter 2023
          </h1>
          {/* <h1 className="tracking-[20px] font-extrabold text-[54px] uppercase animate-character text-center mt-2 font-style leading-none">
          All Rounder
        </h1> */}
          {/* <div className="flex justify-center gap-20 w-4/5 mt-6">
          <AnimatePresence>
            {members.map((member, index) =>
              !showOne ? (
                <Card
                  member={member}
                  key={member.name}
                  starting={starting}
                  showResult={showResult}
                  flipped={flipped[index]}
                  setFlipped={setFlipped}
                  index={index}
                />
              ) : member.goal ? (
                <Card
                  member={member}
                  key={member.name}
                  starting={starting}
                  showResult={showResult}
                  flipped={flipped[index]}
                  setFlipped={setFlipped}
                  index={index}
                />
              ) : null
            )}
          </AnimatePresence>
        </div> */}
          {/* <AnimatePresence mode="wait"> */}
          <PosterList
            showResult={showResult}
            starting={starting}
            showOne={showOne}
            showFinal={showFinal}
          />
          {/* </AnimatePresence> */}
          {!showResult && (
            <motion.button
              initial={{
                y: 50,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 2,
              }}
              whileHover={{
                scale: 1.1,
              }}
              className="glow-effect relative mt-auto flex h-6 w-16 items-center justify-center gap-2 rounded-lg bg-slate-200 text-2xl font-bold text-slate-900"
            >
              <div
                // href={"/miss"}
                className="flex h-full w-full items-center justify-center"
                onClick={() => setShowResult(true)}
              >
                <ArrowRight />
                <svg className="glow-container">
                  <rect
                    pathLength="100"
                    strokeLinecap="round"
                    className={clsx("glow-blur stroke-slate-200")}
                  ></rect>
                  <rect
                    pathLength="100"
                    strokeLinecap="round"
                    className={clsx("glow-line stroke-slate-200")}
                  ></rect>
                </svg>
              </div>
            </motion.button>
          )}
          {showResult && !showOne && (
            <motion.button
              initial={{
                y: 50,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 2,
              }}
              whileHover={{
                scale: 1.1,
              }}
              onClick={handleStartClick}
              className="glow-effect relative mt-auto flex h-6 w-16 items-center justify-center gap-2 rounded-lg bg-slate-200 text-2xl font-bold text-slate-900"
            >
              <div
                // href={"/miss"}
                className="flex h-full w-full items-center justify-center"
              >
                <ArrowRight />
                <svg className="glow-container">
                  <rect
                    pathLength="100"
                    strokeLinecap="round"
                    className={clsx("glow-blur stroke-slate-200")}
                  ></rect>
                  <rect
                    pathLength="100"
                    strokeLinecap="round"
                    className={clsx("glow-line stroke-slate-200")}
                  ></rect>
                </svg>
              </div>
            </motion.button>
          )}
        </div>
      ) : (
        <div className="relative h-screen overflow-hidden">
          <ImageLibrary />
          <motion.button
            initial={{
              y: 50,
              x: "-50%",
              opacity: 0,
            }}
            animate={{
              y: 10,
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 2,
            }}
            whileHover={{
              scale: 1.1,
            }}
            className="glow-effect absolute bottom-20 left-1/2 z-[999] h-20 w-52 rounded-lg"
          >
            <div
              // href={"/miss"}
              className="flex h-full w-full items-center justify-center text-[#e0ccbb]"
              onClick={() => setTrailer(true)}
            >
              <ArrowRight className="h-20 w-40" />
              <svg className="glow-container">
                <rect
                  pathLength="100"
                  strokeLinecap="round"
                  className={clsx("glow-blur stroke-[#e0ccbb]")}
                ></rect>
                <rect
                  pathLength="100"
                  strokeLinecap="round"
                  className={clsx("glow-line stroke-[#e0ccbb]")}
                ></rect>
              </svg>
            </div>
          </motion.button>
        </div>
      )}
    </>
  );
}
