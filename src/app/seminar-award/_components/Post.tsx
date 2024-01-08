import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  showResult: boolean;
  src: string;
  layoutId: string;
  member1: string;
  member2?: string;
};

export default function Post({
  showResult,
  src,
  layoutId,
  member1,
  member2,
}: Props) {
  return (
    <motion.div
      layoutId={layoutId}
      key={2}
      initial={{
        y: -200,
        x: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        x: 0,
        opacity: 1,
      }}
      exit={{
        y: -200,
        x: -100,
        opacity: 0,
      }}
      transition={{
        duration: 1,
      }}
      className="rounded-xl bg-gray-900/70"
    >
      <div
        className={`relative overflow-hidden rounded-xl  ${
          showResult ? "h-[75%]" : "h-[85%]"
        }`}
      >
        <Image src={src} fill alt="" sizes="33vw"></Image>
      </div>
      <div className="flex h-[25%] flex-col p-2 pb-5 text-center font-bold text-cyan-400">
        <h1 className="text-linear text-xl">gRPC</h1>
        {showResult && (
          <>
            <motion.div
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 1,
                delay: 1,
              }}
              className="flex items-center justify-center p-2"
            >
              <motion.span className="tracking-widest text-cyan-400">
                {member1}
              </motion.span>
              {member2 && (
                <>
                  <span className="mx-4 inline-block h-1 w-1 rounded-full bg-cyan-400"></span>
                  <motion.span className="tracking-widest text-cyan-400">
                    Tứ Phương Danh
                  </motion.span>
                </>
              )}
            </motion.div>
            <motion.div
              initial={{
                y: 100,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                ease: "linear",
                duration: 2,
                delay: 1,
              }}
              className="mt-auto text-xl text-white"
            >
              / 28 số phiếu
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
