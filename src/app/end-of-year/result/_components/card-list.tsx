"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clover } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { TEAMS } from "~/app/end-of-year/_components/vote-form";
import VoteItem from "~/app/end-of-year/_components/vote-item";
import FireWork from "~/components/shared/firework";
import { cn } from "~/lib/utils";

type Props = {
  groupedRecord: {
    [key: string]: {
      id: string;
      userId: string;
      ipAddress: string;
      votedId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  };
};
export default function CardList({ groupedRecord }: Props) {
  const [isShowingResult, setIsShowingResult] = useState("idle");

  const itemsVote = Object.keys(groupedRecord).map((key) => ({
    count: groupedRecord[key].length,
    id: key,
  }));

  const itemsVoteSorted = itemsVote
    .sort((a, b) => b.count - a.count)
    .map((item) => item.id);

  return (
    <div className="container relative mx-auto grid flex-1 grid-rows-4 gap-y-3 px-10 pb-14">
      <AnimatePresence>
        {isShowingResult !== "stop"
          ? TEAMS.map((team) => (
              <motion.div layoutId={team.id} key={team.id}>
                <VoteItem
                  id={team.id}
                  title={team.title}
                  image={team.image}
                  description={team.description}
                  result={groupedRecord[team.id]}
                  isShowingResult={isShowingResult}
                  totalVoted={Object.keys(groupedRecord).reduce(
                    (acc, curr) => acc + groupedRecord[curr].length,
                    0
                  )}
                />
              </motion.div>
            ))
          : TEAMS.sort(
              (a, b) =>
                itemsVoteSorted.indexOf(a.id) - itemsVoteSorted.indexOf(b.id)
            ).map((team, index) => (
              <motion.div layoutId={team.id} key={team.id} className="relative">
                <VoteItem
                  id={team.id}
                  title={team.title}
                  image={team.image}
                  description={team.description}
                  result={groupedRecord[team.id]}
                  isShowingResult={isShowingResult}
                  totalVoted={Object.keys(groupedRecord).reduce(
                    (acc, curr) => acc + groupedRecord[curr].length,
                    0
                  )}
                />
                {isShowingResult === "stop" && (
                  <motion.div
                    initial={{ opacity: 0, x: -200 }}
                    animate={{
                      opacity: 1,
                      x: "-100%",
                      y: "-50%",
                      scale: index === 0 ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      scale: {
                        repeat: Infinity,
                        duration: 1,
                        delay: 1,
                      },
                    }}
                    className="w-10items-center absolute -left-4 top-1/2 flex justify-center gap-2"
                  >
                    {index !== 3 && (
                      <Image
                        alt=""
                        src={`/images/${index + 1}.png`}
                        width={40}
                        height={40}
                        style={{
                          scale: index === 0 ? 1.5 : index === 1 ? 1.2 : 1,
                        }}
                      />
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
      </AnimatePresence>
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
        className="glow-effect absolute bottom-0 left-1/2 z-[999] h-10 w-28 rounded-lg"
      >
        <div
          className="flex h-full w-full items-center justify-center text-[#3889ec]"
          onClick={() => {
            setIsShowingResult("starting");
            setTimeout(
              () => {
                setIsShowingResult("stop");
              },
              Math.max(...itemsVote.map((item) => item.count)) * 200 + 3000
            );
          }}
        >
          <Clover className="h-10 w-10" />
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
      {isShowingResult === "stop" && (
        <FireWork id={"canvas-left"} className="fixed -left-[10%]" />
      )}
      {isShowingResult === "stop" && (
        <FireWork id={"canvas-right"} className="fixed -right-[10%]" />
      )}
      {isShowingResult === "stop" && (
        <div className="absolute inset-0 flex -translate-y-1/2 justify-center">
          <FireWork id={"canvas-center"} />
        </div>
      )}
    </div>
  );
}
