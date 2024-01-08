/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { HelpCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CongratulationParticles from "~/app/seminar-award/_components/CongratulationParticles";

type Props = {
  member: any;
  starting: boolean;
  showResult: boolean;
  flipped: boolean;
  setFlipped: any;
  index: number;
};

export default function Card({
  member,
  starting,
  showResult,
  flipped,
  setFlipped,
  index,
}: Props) {
  const [score, setScore] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (starting && !showResult) {
      timer.current = setInterval(() => {
        setScore(Math.ceil(Math.random() * 30));
      }, 100);
    }
    if (showResult) {
      clearInterval(timer.current!);
      setScore(member.score);
    }
  }, [starting, member.score, showResult]);
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: index === 0 ? -100 : index === 2 ? 100 : 0,
        y: -50,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      exit={{
        y: 800,
      }}
      layoutId={`card-${index}`}
      className={clsx(
        "relative w-[300px]",
        showResult && member.goal && "shadow-xl"
      )}
    >
      <div
        className="flip-card w-full shrink-0"
        onClick={() => setFlipped((prev: any) => ({ ...prev, [index]: true }))}
      >
        <div
          className={clsx(
            "flip-card-inner rounded-xl bg-gray-700/30",
            flipped && "flipped !bg-black/70"
          )}
        >
          <div className="flip-card-front flex flex-col overflow-hidden rounded-xl backdrop-blur-sm">
            <div className="question-icon relative flex h-[300px] w-full items-center justify-center">
              <HelpCircle
                size={"200px"}
                className="question-icon__animate text-gray-500"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4 pb-8 text-center tracking-widest">
              <p className="relative mx-auto w-fit font-bold">
                <span className="text-2xl font-extrabold tracking-wide text-blue-400 opacity-0">
                  {member.name}
                </span>
                <span className="absolute inset-0 animate-pulse rounded-lg bg-gray-700"></span>
              </p>
              <p className="italic">{member.role}</p>
              {/* <span className="font-bold text-slate-200 text-3xl leading-none">
                  Số phiếu:
                </span>
                <div className="flex items-center">
                  {!starting ? (
                    <div className="bg-gray-700 rounded-lg animate-pulse w-14 h-14" />
                  ) : (
                    <span className="font-extrabold text-6xl leading-none">
                      {score}
                    </span>
                  )}
                </div> */}
              <div className="mt-auto flex flex-col items-center justify-center gap-4 text-xl">
                <span className="text-3xl font-bold leading-none text-slate-200">
                  Số phiếu:
                </span>
                <div className="flex items-center text-slate-200">
                  {!starting ? (
                    <HelpCircle size={"50px"} />
                  ) : (
                    <span className="text-6xl font-extrabold leading-none">
                      {score}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flip-card-back flex flex-col overflow-hidden rounded-xl bg-gray-700/30 backdrop-blur-sm">
            <div className="relative h-[300px] w-full">
              <Image src={member.avatar} alt="" fill />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4 pb-8 text-center tracking-widest">
              <p className="text-2xl font-extrabold tracking-wide text-blue-400">
                {member.name}
              </p>
              <p className="italic text-slate-300">{member.role}</p>
              <div className="mt-auto flex flex-col items-center justify-center gap-4 text-xl">
                <span className="text-3xl font-bold leading-none text-slate-200">
                  Số phiếu:
                </span>
                <div className="flex items-center text-slate-200">
                  {!starting ? (
                    <HelpCircle size={"50px"} />
                  ) : (
                    <span className="score text-6xl font-extrabold leading-none">
                      {score}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showResult && member.goal && (
        <motion.div
          initial={{
            y: -100,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 1,
          }}
        >
          <div className="absolute -inset-32" style={{ perspective: "1000px" }}>
            <CongratulationParticles />
          </div>
          <div className="card-shadow"></div>
        </motion.div>
      )}
      {showResult && !member.goal && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            className="absolute inset-0 rounded-xl bg-black/50"
            style={{ perspective: "1000px" }}
          ></motion.div>
        </>
      )}
    </motion.div>
  );
}
