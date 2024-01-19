"use client";

import { SparklesCore } from "~/components/ui/sparktles";
import { Spotlight } from "~/components/ui/sportlight";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";

type Props = {
  headingContent: string;
  isShowParticles?: boolean;
};

export function Hero({ headingContent, isShowParticles = true }: Props) {
  return (
    <div className="relative pt-[5rem] bg-dot-white/20">
      <Spotlight
        className="left-0 top-40 md:-top-20 md:left-60"
        fill="rgb(14 165 233)"
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
        {headingContent.split("").map((char, index) => (
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
      <div
        className={cn("relative h-48 w-full", {
          "h-2": !isShowParticles,
        })}
      >
        <div className="absolute left-1/2 top-0 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
        <div className="absolute left-1/2 top-0  h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute inset-x-[50%] top-0 h-[5px] w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
        <div className="absolute inset-x-[50%] top-0 h-px w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        {isShowParticles && (
          <>
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="h-full w-full"
              particleColor="#FFFFFF"
            />
            <div className="absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(400px_250px_at_top,transparent_50%,white)]"></div>
          </>
        )}
      </div>
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
    </div>
  );
}
