import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CongratulationParticles from "~/app/seminar-award/_components/CongratulationParticles";
// import Heart from "~/app/seminar-award/_components/Heart";
import { images } from "~/app/seminar-award/_components/ImageLibrary";
import { cn } from "~/lib/utils";

type Props = {
  showResult: boolean;
  showOne: boolean;
  starting: boolean;
  showFinal: boolean;
};

function PosterList({ showResult, showOne, starting, showFinal }: Props) {
  const [showTwo, setShowTwo] = useState(false);
  const [showResultDelay, setShowResultDelay] = useState(false);
  const [changeLayout, setChangeLayout] = useState(false);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const timer2 = useRef<NodeJS.Timeout | null>(null);
  const timer3 = useRef<NodeJS.Timeout | null>(null);
  const timer4 = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showResult)
      setTimeout(() => {
        setChangeLayout(true);
      }, 1000);
  }, [showResult]);

  useEffect(() => {
    if (starting && !showOne) {
      timer2.current = setInterval(() => {
        setScore1(Math.ceil(Math.random() * 21));
      }, 100);
    }
    if (showOne) {
      clearInterval(timer2.current!);
      setScore1(11);
    }
  }, [starting, showOne]);

  useEffect(() => {
    if (starting && !showOne) {
      timer.current = setInterval(() => {
        setScore2(Math.ceil(Math.random() * 21));
      }, 100);
    }
    if (showOne) {
      clearInterval(timer.current!);
      setScore2(4);
    }
  }, [starting, showOne]);

  useEffect(() => {
    if (starting && !showOne) {
      timer3.current = setInterval(() => {
        setScore3(Math.ceil(Math.random() * 16));
      }, 100);
    }
    if (showOne) {
      clearInterval(timer3.current!);
      setScore3(12);
    }
  }, [starting, showOne]);

  useEffect(() => {
    if (starting && !showOne) {
      timer4.current = setInterval(() => {
        setScore4(Math.ceil(Math.random() * 16));
      }, 100);
    }
    if (showOne) {
      clearInterval(timer4.current!);
      setScore4(2);
    }
  }, [starting, showOne]);
  useEffect(() => {
    if (showOne) setTimeout(() => setShowTwo(true), 1700);
  }, [showOne]);
  useEffect(() => {
    if (showResult) setTimeout(() => setShowResultDelay(true), 1500);
  }, [showResult]);

  return (
    <div
      className={cn(
        `grid shrink-0 grid-cols-4 px-10 ${
          !changeLayout ? "" : "h-3/5"
        } w-[90%] max-w-5xl gap-x-6 gap-y-4 2xl:max-w-7xl ${
          showResultDelay ? "h-[55dvh]" : "h-[69dvh]"
        }`,
        {
          "translate-x-1/4": showTwo,
        }
      )}
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
          className="relative rounded-xl bg-gray-900/70"
        >
          <div
            className={`relative z-[999] overflow-hidden rounded-xl ${
              showResult ? "h-[78%]" : "z-10 h-[85%]"
            }`}
          >
            <Image src={images[1]} fill alt="" sizes="33vw"></Image>
          </div>
          <div className="flex h-[23%] flex-col p-2 pb-2 text-center font-bold text-cyan-400">
            {!showResult && (
              <h1 className="text-linear font-extrabold">Elk Stack</h1>
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
                  className="flex flex-col items-center justify-center px-2 leading-5"
                >
                  <motion.span className="tracking-widest text-cyan-400">
                    Trần Quang Quí
                  </motion.span>
                  <motion.span className="tracking-widest text-cyan-400">
                    Nguyễn Xuân Thơm
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
                  className="mt-auto  text-[#e0ccbb]"
                >
                  {!starting ? "?" : score3} / 16 số phiếu
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
              <div style={{ perspective: "1000px" }}>
                <CongratulationParticles />
              </div>
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
                  <CongratulationParticles id="4" />
                </div>
                <div className="card-shadow !opacity-30"></div>
              </motion.div>
              {/* <motion.div
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
              </motion.div> */}
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
              className="text-center  font-bold tracking-widest text-[#e0ccbb]"
            >
              Nhất quý 3
            </motion.div>
          )}
        </motion.div>
        {!showOne && (
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
              // y: 500,
              scale: 2,
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
            <div
              className={`relative z-[999] overflow-hidden rounded-xl ${
                showResult ? "h-[78%]" : "z-10 h-[85%]"
              }`}
            >
              <Image src={images[3]} fill alt="" sizes="33vw"></Image>
            </div>
            <div className="flex h-[23%] flex-col p-2 pb-2 text-center font-bold text-cyan-400">
              {!showResult && (
                <h1 className="text-linear font-extrabold">React Native</h1>
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
                      Lê Phước Thiên
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
                    className="mt-auto text-[#e0ccbb]"
                  >
                    {!starting ? "?" : score4} / 16 số phiếu
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
                <div style={{ perspective: "1000px" }}>
                  <CongratulationParticles id="0" />
                </div>
                <div className="card-shadow !opacity-30"></div>
              </motion.div>
            )}
            {/* {showOne && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                y: 30,
                opacity: 1,
              }}
              className="text-center  font-bold tracking-widest text-[#e0ccbb]"
            >
              Nhất quí 3
            </motion.div>
          )} */}
          </motion.div>
        )}
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
                <h1 className="text-linear font-extrabold">Smart Contracts</h1>
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
                <Image src={images[4]} fill alt="" sizes="33vw"></Image>
              </div>
              <div className="p-2 text-center font-bold text-cyan-400">
                <h1 className="text-linear font-extrabold">ElectronJS</h1>
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
                x: "50%",
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
                <h1 className="text-linear font-extrabold">
                  Supper App & Mini App
                </h1>
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
            x: showResult ? 0 : "50%",

            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="relative rounded-xl bg-gray-900/70"
        >
          <div
            className={`relative z-[999] overflow-hidden  rounded-xl ${
              showResult ? "h-[78%]" : "h-[85%]"
            }`}
          >
            <Image src={images[6]} fill alt="" sizes="33vw"></Image>
          </div>
          <div className="flex h-[23%] flex-col p-2 pb-2 text-center font-bold text-cyan-400">
            {!showResult && (
              <h1 className="text-linear font-extrabold">MySQL Deadlock</h1>
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
                    Nguyễn Hữu Tuấn
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
                  className="mt-auto  text-[#e0ccbb]"
                >
                  {!starting ? "?" : score1} / 21 số phiếu
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
              <div style={{ perspective: "1000px" }}>
                <CongratulationParticles />
              </div>
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
                  <CongratulationParticles id="1" />
                </div>
                <div className="card-shadow !opacity-30"></div>
              </motion.div>
              {/* <motion.div
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
              </motion.div> */}
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
              className="text-center  font-bold tracking-widest text-[#e0ccbb]"
            >
              Nhất quý 4
            </motion.div>
          )}
        </motion.div>
        {!showOne && (
          <motion.div
            layoutId="poster2"
            key={7}
            initial={{
              y: 200,
              x: 100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              x: showResult ? 0 : "50%",
              opacity: 1,
            }}
            exit={{
              scale: 2,
              opacity: 0,
              transition: {
                delay: 0.5,
                duration: 1.5,
              },
            }}
            transition={{
              duration: 1,
            }}
            className="relative rounded-xl bg-gray-900/70"
          >
            <div
              className={`relative z-[999] overflow-hidden  rounded-xl ${
                showResult ? "h-[78%]" : "h-[85%]"
              }`}
            >
              <Image src={images[5]} fill alt="" sizes="33vw"></Image>
            </div>
            <div className="flex h-[23%] flex-col p-2 pb-2 text-center font-bold text-cyan-400">
              {!showResult && (
                <h1 className="text-linear font-extrabold">
                  Introduction SBPayment
                </h1>
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
                    className="p-2"
                  >
                    <motion.span className="tracking-widest text-cyan-400">
                      Lê Thành Trung
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
                    className="mt-auto text-[#e0ccbb]"
                  >
                    {!starting ? "?" : score2} / 21 số phiếu
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
                <div style={{ perspective: "1000px" }}>
                  <CongratulationParticles id="5" />
                </div>
                <div className="card-shadow !opacity-30"></div>
              </motion.div>
            )}
            {/* {showOne && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                y: 30,
                opacity: 1,
              }}
              className="text-center  font-bold tracking-widest text-[#e0ccbb]"
            >
              Giải nhì
            </motion.div>
          )} */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PosterList;
