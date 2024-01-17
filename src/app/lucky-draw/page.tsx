"use client";

import { set } from "date-fns";
import { useState } from "react";
import Header from "~/app/end-of-year/_components/header";
import { Button } from "~/components/ui/button";
import { SparklesCore } from "~/components/ui/sparktles";
import { Spotlight } from "~/components/ui/sportlight";
import { cn } from "~/lib/utils";

const luckyNumbers = [
  3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33,
];

export default function EndOfYearPage() {
  const [luckyNumber, setLuckyNumber] = useState(0);
  const handleClick = () => {
    const intervalTimer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * luckyNumbers.length);
      setLuckyNumber(luckyNumbers[randomIndex]);
    }, 50);
    setTimeout(() => {
      clearInterval(intervalTimer);
    }, 15000);
  };
  return (
    <section>
      <Header />
      <div className="relative flex h-screen flex-col overflow-hidden py-[8rem] bg-dot-white/20">
        <Spotlight
          className="left-0 top-40 animate-spotlight md:-top-24 md:left-60"
          fill="rgb(14 165 233)"
        />
        <Spotlight
          className="animate-spotlight-reverse right-0 top-40 md:-top-24 md:right-60"
          fill="rgb(14 165 233)"
        />
        <div className="heading-animation relative z-20 text-center text-xl font-bold uppercase text-white md:text-3xl lg:text-5xl">
          <h2>{"lucky draw"}</h2>
          <h2 className="absolute inset-0">{"lucky-draw"}</h2>
        </div>
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
          <div className="absolute inset-0 flex items-center justify-center text-[5vw] font-extrabold">
            {luckyNumber}
          </div>
        </div>
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        <Button
          className="absolute bottom-0 left-1/2 mb-10 -translate-x-1/2 transform"
          onClick={handleClick}
        >
          {"start"}
        </Button>
      </div>
    </section>
  );
}
