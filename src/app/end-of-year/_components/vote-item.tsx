import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/ui-button";
import { motion } from "framer-motion";

type Props = {
  id: string;
  image: string;
  title: string;
  description: string;
  selected?: boolean;
  result?: {
    id: string;
    userId: string;
    ipAddress: string;
    votedId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  isShowingResult?: string;
  totalVoted?: number;
  place?: number;
};

export default function VoteItem({
  image,
  title,
  description,
  selected,
  result,
  isShowingResult,
  totalVoted,
  place,
}: Props) {
  const [voteCount, setVoteCount] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isShowingResult === "starting") {
      timer.current = setInterval(() => {
        setVoteCount((prev) => prev + 1);
      }, 200);
    }
  }, [isShowingResult]);

  if (voteCount === result?.length) clearInterval(timer.current!);

  return (
    <Button
      as={"div"}
      className="border-slate-800/40 bg-slate-900/40"
      duration={4000}
      containerClassName="h-full"
    >
      <Card className="relative h-full w-full cursor-pointer border-none bg-transparent">
        <CardContent className="grid h-full grid-cols-3 gap-4 p-0">
          <div className="relative">
            <Image
              src={image}
              alt={title}
              fill
              className="rounded-l-[25px] object-cover"
            />
          </div>
          <div className="relative col-span-2 space-y-2 p-4">
            <h3 className="text-base font-extrabold text-blue-500 brightness-150">
              {title}
            </h3>
            <p className="font-bold uppercase text-slate-300">{description}</p>
            {result && totalVoted && (
              <div className="progress-infinite absolute -left-4 bottom-0 right-0 h-2">
                <div
                  className="progress-bar3 rounded-r-xl"
                  style={{
                    width: `${(voteCount / totalVoted) * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>
        </CardContent>
        {place === 1 && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 3,
            }}
            className="absolute -inset-1 z-10"
          >
            <div className="card-shadow !opacity-30"></div>
          </motion.div>
        )}
      </Card>
      {selected && (
        <div className="absolute inset-0 rounded-[1.5rem] bg-blue-700/20"></div>
      )}
    </Button>
  );
}
