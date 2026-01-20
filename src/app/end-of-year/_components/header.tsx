"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-[99] flex w-full items-center justify-between p-4 md:px-7">
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
        className="w-[100px] md:w-[200px]"
      >
        {/* <Image
          src={"/custom-logo-company-white.png"}
          alt=""
          width={200}
          height={40}
        /> */}
      </motion.div>

      <motion.div
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
        className="heading-animation relative z-20 select-none text-center text-base font-bold uppercase text-white md:text-2xl lg:text-3xl"
      >
        <h2 className="tracking-widest">Year End Party</h2>
        <h2 className="absolute inset-0 tracking-widest">Year End Party</h2>
      </motion.div>
    </header>
  );
}
