import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Heart from "~/app/seminar-award/_components/Heart";
import { images } from "~/app/seminar-award/_components/ImageLibrary";

type Props = {
  showResult: boolean;
  showOne: boolean;
  starting: boolean;
  showFinal: boolean;
};

function PosterList({ showResult, showOne, starting, showFinal }: Props) {
  console.log(showFinal);
  const [changeLayout, setChangeLayout] = useState(false);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const timer2 = useRef<NodeJS.Timeout | null>(null);
  const timer3 = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showResult)
      setTimeout(() => {
        setChangeLayout(true);
      }, 1000);
  }, [showResult]);

  useEffect(() => {
    if (starting && !showOne) {
      timer2.current = setInterval(() => {
        setScore1(Math.ceil(Math.random() * 30));
      }, 100);
    }
    if (showOne) {
      clearInterval(timer2.current!);
      setScore1(8);
    }
  }, [starting, showOne]);

  useEffect(() => {
    if (starting && !showOne) {
      timer.current = setInterval(() => {
        setScore2(Math.ceil(Math.random() * 30));
      }, 100);
    }
    if (showOne) {
      clearInterval(timer.current!);
      setScore2(6);
    }
  }, [starting, showOne]);

  useEffect(() => {
    if (starting && !showOne) {
      timer3.current = setInterval(() => {
        setScore3(Math.ceil(Math.random() * 30));
      }, 100);
    }
    if (showOne) {
      clearInterval(timer3.current!);
      setScore3(6);
    }
  }, [starting, showOne]);

  return (
    <div
      className={`grid ${
        !changeLayout ? "grid-cols-4" : "h-3/5 grid-cols-3"
      } w-[90%] max-w-5xl gap-x-8 gap-y-4 ${
        showResult ? "h-[55dvh]" : "h-[67dvh]"
      }`}
    >
      <AnimatePresence>
        <motion.div
          layoutId="poster3"
          key={2}
          initial={{
            y: -200,
            x: -100,
            opacity: 0,
          }}
          animate={{
            y: showOne ? 50 : 0,

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
          className="relative rounded-xl bg-gray-900/70"
        >
          <div
            className={`relative z-[999] overflow-hidden rounded-xl ${
              showResult ? "h-[75%]" : "z-10 h-[85%]"
            }`}
          >
            <Image src={images[1]} fill alt="" sizes="33vw"></Image>
          </div>
          <div className="flex h-[25%] flex-col p-2 pb-2 text-center font-bold text-cyan-400">
            {!showResult && (
              <h1 className="text-linear font-extrabold">gRPC</h1>
            )}
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
                    delay: 3,
                  }}
                  className="flex items-center justify-center p-2"
                >
                  <motion.span className="tracking-widest text-cyan-400">
                    Vĩnh Lâm
                  </motion.span>
                  <span className="mx-2 inline-block h-1 w-1 rounded-full bg-cyan-400"></span>
                  <motion.span className="tracking-widest text-cyan-400">
                    Phương Danh
                  </motion.span>
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
                    duration: 1,
                    delay: 3,
                  }}
                  className="mt-auto text-xl text-[#e0ccbb]"
                >
                  {!starting ? "?" : score3} / 28 số phiếu
                </motion.div>
              </>
            )}
          </div>
          {starting && !showOne && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                repeatDelay: 4,
              }}
              className="absolute -inset-1 z-10"
            >
              {/* <div style={{ perspective: "1000px" }}>
                <CongratulationParticles />
              </div> */}
              <div className="card-shadow !opacity-30"></div>
            </motion.div>
          )}
          {showOne && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                y: 30,
                opacity: 1,
              }}
              className="text-center text-xl font-bold tracking-widest text-[#e0ccbb]"
            >
              Giải nhì
            </motion.div>
          )}
        </motion.div>
        {!showResult ? (
          <>
            <motion.div
              key={3}
              initial={{
                y: -200,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 500,
                opacity: 0,
                transition: {
                  delay: 1,
                  duration: 1.5,
                },
              }}
              transition={{
                duration: 1,
              }}
              className="rounded-xl bg-gray-900/70"
            >
              <div className="relative h-[85%] overflow-hidden rounded-xl ">
                <Image src={images[2]} fill alt="" sizes="33vw"></Image>
              </div>
              <div className="p-2 text-center font-bold text-cyan-400">
                <h1 className="text-linear font-extrabold">Hasura GraphQL</h1>
              </div>
            </motion.div>
            <motion.div
              key={4}
              initial={{
                y: -200,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 500,
                opacity: 0,
                transition: {
                  delay: 2,
                  duration: 1.5,
                },
              }}
              transition={{
                duration: 1,
                type: "easeIn",
              }}
              className="rounded-xl bg-gray-900/70"
            >
              <div className="relative h-[85%] overflow-hidden rounded-xl ">
                <Image src={images[5]} fill alt="" sizes="33vw"></Image>
              </div>
              <div className="p-2 text-center font-bold text-cyan-400">
                <h1 className="text-linear font-extrabold">Svelte</h1>
              </div>
            </motion.div>
            <motion.div
              key={1}
              initial={{
                x: 200,
                y: -200,
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 500,
                opacity: 0,
                transition: {
                  delay: 1.5,
                  duration: 1.5,
                },
              }}
              transition={{
                duration: 1,
                type: "easeIn",
              }}
              className="rounded-xl bg-gray-900/70"
            >
              <div className="relative h-[85%] overflow-hidden rounded-xl ">
                <Image src={images[0]} fill alt="" sizes="33vw"></Image>
              </div>
              <div className="p-2 text-center font-bold text-cyan-400">
                <h1 className="text-linear font-extrabold">Flutter</h1>
              </div>
            </motion.div>
            <motion.div
              key={8}
              initial={{
                x: -200,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                y: 500,
                opacity: 0,
                transition: {
                  delay: 2.5,
                  duration: 1.5,
                },
              }}
              transition={{
                duration: 1,
                type: "easeIn",
              }}
              className="rounded-xl bg-gray-900/70"
            >
              <div className="relative h-[85%] overflow-hidden rounded-xl ">
                <Image src={images[7]} fill alt="" sizes="33vw"></Image>
              </div>
              <div className="p-2 text-center font-bold text-cyan-400">
                <h1 className="text-linear font-extrabold">Laravel Caching</h1>
              </div>
            </motion.div>
            <motion.div
              key={5}
              initial={{
                y: 200,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 500,
                opacity: 0,
                transition: {
                  delay: 0.5,
                  duration: 1.5,
                },
              }}
              transition={{
                duration: 1,
                type: "easeIn",
              }}
              className="rounded-xl bg-gray-900/70"
            >
              <div className="relative h-[85%] overflow-hidden rounded-xl ">
                <Image src={images[3]} fill alt="" sizes="33vw"></Image>
              </div>
              <div className="p-2 text-center font-bold text-cyan-400">
                <h1 className="text-linear font-extrabold">Security</h1>
              </div>
            </motion.div>
          </>
        ) : null}
        <motion.div
          layoutId="poster1"
          key={6}
          initial={{
            y: 200,
            x: 100,
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
          className="relative rounded-xl bg-gray-900/70"
        >
          <div
            className={`relative z-[999] overflow-hidden  rounded-xl ${
              showResult ? "h-[75%]" : "h-[85%]"
            }`}
          >
            <Image src={images[6]} fill alt="" sizes="33vw"></Image>
          </div>
          <div className="flex h-[25%] flex-col p-2 pb-2 text-center font-bold text-cyan-400">
            {!showResult && (
              <h1 className="text-linear font-extrabold">WebSocket</h1>
            )}
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
                    delay: 3,
                  }}
                  className="flex items-center justify-center p-2"
                >
                  <motion.span className="tracking-widest text-cyan-400">
                    Duy Khang
                  </motion.span>
                  <span className="mx-2 inline-block h-1 w-1 rounded-full bg-cyan-400">
                    {" "}
                  </span>
                  <motion.span className="tracking-widest text-cyan-400">
                    Thành An
                  </motion.span>
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
                    duration: 1,
                    delay: 3,
                  }}
                  className="mt-auto text-xl text-[#e0ccbb]"
                >
                  {!starting ? "?" : score1} / 28 số phiếu
                </motion.div>
              </>
            )}
          </div>
          {starting && !showOne && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: 4,
                repeatDelay: 4,
              }}
              className="absolute -inset-1 z-10"
            >
              {/* <div style={{ perspective: "1000px" }}>
                <CongratulationParticles />
              </div> */}
              <div className="card-shadow !opacity-30"></div>
            </motion.div>
          )}
          {showOne && (
            <>
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
                <div
                  className="absolute -inset-32"
                  style={{ perspective: "1000px" }}
                >
                  {/* <CongratulationParticles /> */}
                </div>
                <div className="card-shadow !opacity-30"></div>
              </motion.div>
              <motion.div
                initial={{
                  scaleX: 0,
                  scaleY: 0,
                }}
                animate={{
                  scaleX: 1,
                  scaleY: 1.4,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  delay: 0.5,
                  ease: "easeOut",
                  duration: 1,
                  opacity: {
                    duration: 4,
                  },
                }}
                className="absolute inset-1 z-[1000]"
              >
                <Heart />
              </motion.div>
            </>
          )}
          {showOne && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                y: 30,
                opacity: 1,
              }}
              className="text-center text-xl font-bold tracking-widest text-[#e0ccbb]"
            >
              Giải nhất
            </motion.div>
          )}
        </motion.div>
        <motion.div
          layoutId="poster2"
          key={7}
          initial={{
            y: 200,
            x: 100,
            opacity: 0,
          }}
          animate={{
            y: showOne ? 50 : 0,
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="relative rounded-xl bg-gray-900/70"
        >
          <div
            className={`relative z-[999] overflow-hidden  rounded-xl ${
              showResult ? "h-[75%]" : "h-[85%]"
            }`}
          >
            <Image src={images[4]} fill alt="" sizes="33vw"></Image>
          </div>
          <div className="flex h-[25%] flex-col p-2 pb-2 text-center font-bold text-cyan-400">
            {!showResult && <h1 className="text-linear font-extrabold">SEO</h1>}
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
                    delay: 3,
                  }}
                  className="p-2"
                >
                  <motion.span className="tracking-widest text-cyan-400">
                    Phan Đức Nhân
                  </motion.span>
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
                    duration: 1,
                    delay: 3,
                  }}
                  className="mt-auto text-xl text-[#e0ccbb]"
                >
                  {!starting ? "?" : score2} / 28 số phiếu
                </motion.div>
              </>
            )}
          </div>
          {starting && !showOne && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: 2,
                repeatDelay: 4,
              }}
              className="absolute -inset-1 z-10"
            >
              {/* <div style={{ perspective: "1000px" }}>
                <CongratulationParticles />
              </div> */}
              <div className="card-shadow !opacity-30"></div>
            </motion.div>
          )}
          {showOne && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                y: 30,
                opacity: 1,
              }}
              className="text-center text-xl font-bold tracking-widest text-[#e0ccbb]"
            >
              Giải nhì
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default PosterList;
