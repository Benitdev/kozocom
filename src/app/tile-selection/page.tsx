"use client";

import TileSelectionHeader from "./_components/header";
import { TileGrid } from "./_components/tile-grid";
import { SparklesCore } from "~/components/ui/sparktles";
import { Spotlight } from "~/components/ui/sportlight";
import { motion } from "framer-motion";

export default function TileSelectionPage() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <TileSelectionHeader />
      <div className="relative flex min-h-screen flex-col overflow-hidden py-[6rem] bg-dot-white/20">
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
          className="animate-character mx-auto mb-8 select-none space-x-1 text-center font-heading text-xl font-extrabold uppercase !leading-[1.5] md:text-3xl lg:text-5xl"
        >
          {"number selection".split("").map((char, index) => (
            <span
              key={index}
              style={{
                animationDelay: `calc(0.1s * ${index + 1})`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </motion.h1>
        <div className="relative mx-auto w-full flex-1 px-4">
          <div className="absolute left-1/2 top-0 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm" />
          <div className="absolute left-1/2 top-0  h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <div className="absolute inset-x-[50%] top-0 h-[5px] w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm" />
          <div className="absolute inset-x-[50%] top-0 h-px w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="absolute inset-0 h-full w-full"
            particleColor="#FFFFFF"
          />
          <div className="absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(400px_60%_at_center,transparent_50%,white)]"></div>
          <TileGrid />
        </div>
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      </div>
    </section>
  );
}
