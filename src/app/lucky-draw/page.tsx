"use client";

import { useState } from "react";
import Header from "~/app/end-of-year/_components/header";
import LuckyDraw from "~/app/lucky-draw/_component/lucky-draw";
import { SparklesCore } from "~/components/ui/sparktles";
import { Spotlight } from "~/components/ui/sportlight";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";
import { Clover } from "lucide-react";

export default function EndOfYearPage() {
  const [randomState, setRandomState] = useState("idle");
  const handleClick = () => {
    setRandomState("starting");
    setTimeout(() => {
      setRandomState("stop");
    }, 5000);
  };

  return (
    <section>
      <Header />
      <div className="relative flex h-screen flex-col overflow-hidden py-[6rem] bg-dot-white/20">
        <Spotlight
          className="left-0 top-40 animate-spotlight md:-top-24 md:left-60"
          fill="#3889ec"
        />
        <Spotlight
          className="animate-spotlight-reverse right-0 top-40 md:-top-24 md:right-60"
          fill="#3889ec"
        />
        <motion.h1
          initial={{
            y: -20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="animate-character mx-auto select-none space-x-1 text-center font-heading text-xl font-extrabold uppercase !leading-[1.5] md:text-3xl lg:text-5xl"
        >
          {"lucky draw".split("").map((char, index) => (
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
        <div className={cn("relative mx-auto w-full flex-1")}>
          <div className="absolute left-1/2 top-0 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
          <div className="absolute left-1/2 top-0  h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="absolute inset-x-[50%] top-0 h-[5px] w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
          <div className="absolute inset-x-[50%] top-0 h-px w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="h-full w-full"
            particleColor="#FFFFFF"
          />
          <div className="absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(400px_60%_at_center,transparent_50%,white)]"></div>
          <LuckyDraw randomState={randomState} />
        </div>
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        {(randomState === "idle" || randomState === "stop") && (
          <motion.button
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{
              opacity: 0,
              y: 200,
            }}
            transition={{
              delay: 1,
            }}
            whileHover={{
              scale: 1.1,
            }}
            className="glow-effect absolute bottom-8 left-1/2 z-[999] h-14 w-36 rounded-lg"
          >
            <div
              className="flex h-full w-full items-center justify-center text-[#3889ec]"
              onClick={handleClick}
            >
              <Clover className="h-12 w-20" />
              <svg className="glow-container">
                <rect
                  pathLength="100"
                  strokeLinecap="round"
                  className={cn("glow-blur stroke-[#3889ec]")}
                ></rect>
                <rect
                  pathLength="100"
                  strokeLinecap="round"
                  className={cn("glow-line stroke-[#3889ec]")}
                ></rect>
              </svg>
            </div>
          </motion.button>
        )}
      </div>
    </section>
  );
}
