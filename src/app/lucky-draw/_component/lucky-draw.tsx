"use client";

import React, { useEffect, useRef, useState } from "react";
import CongratulationParticles from "~/app/seminar-award/_components/CongratulationParticles";
import { motion } from "framer-motion";

export default function LuckyDraw({ randomState }: { randomState: string }) {
  const [luckyNumber, setLuckyNumber] = useState(0);
  const intervalTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const luckyNumbers: number[] = JSON.parse(
      localStorage.getItem("luckyNumbers") ?? "[]"
    );

    if (randomState === "starting") {
      intervalTimer!.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * luckyNumbers.length);
        setLuckyNumber(luckyNumbers[randomIndex]);
      }, 100);
      return;
    }

    if (randomState === "stop") {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * luckyNumbers.length);
        setLuckyNumber(luckyNumbers[randomIndex]);
        luckyNumbers.splice(randomIndex, 1);
        localStorage.setItem("luckyNumbers", JSON.stringify(luckyNumbers));
      }, 250);
      if (intervalTimer.current) {
        clearInterval(intervalTimer.current);
      }
      return;
    }
    setLuckyNumber(0);
  }, [randomState]);

  useEffect(() => {
    localStorage.setItem(
      "luckyNumbers",
      JSON.stringify(Array.from({ length: 100 }, (_, i) => i + 1))
    );
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center text-[9vw] font-extrabold">
      <motion.div
        {...(randomState === "stop"
          ? {
              animate: {
                scale: [1, 1.2, 1.3, 2, 1],
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1.3)"],
              },
              transition: {
                delay: 0.5,
                repeat: Infinity,
              },
            }
          : {})}
        className="text-blue-100"
      >
        {luckyNumber}
      </motion.div>
      {randomState === "stop" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
          }}
          style={{ perspective: "1000px" }}
          className="absolute -top-20 h-[500px] w-[500px]"
        >
          <CongratulationParticles id="lucky-draw" />
        </motion.div>
      )}
    </div>
  );
}