"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const heading = "Year End Party";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-[99] flex w-full items-center justify-between p-4 px-7">
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
  );
}
