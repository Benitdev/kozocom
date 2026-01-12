"use client";

import { cn } from "~/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface TileProps {
  number: number;
  isFlipped?: boolean; // Deprecated - kept for backward compatibility
  isSelected: boolean | null; // null = unknown, true = selected/taken, false = available
  isSelecting: boolean;
  onClick: () => void;
}

export function Tile({ number, isSelected, isSelecting, onClick }: TileProps) {
  const isDisabled = isSelected === true;
  const isAvailable = isSelected === false;

  return (
    <motion.div
      className="relative h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <motion.div
        className={cn(
          "group relative h-full w-full cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300",
          isDisabled
            ? "cursor-not-allowed border-red-500/50 bg-gradient-to-br from-red-900/60 to-orange-900/60 opacity-60"
            : isSelecting
              ? "border-blue-500/70 bg-gradient-to-br from-blue-900/80 to-cyan-900/80 shadow-lg shadow-blue-500/20"
              : isAvailable
                ? "border-blue-400/50 bg-gradient-to-br from-blue-800/70 to-cyan-800/70 shadow-md hover:border-blue-300/70 hover:shadow-lg hover:shadow-blue-400/30"
                : "border-blue-600/50 bg-gradient-to-br from-blue-900/70 to-slate-800/70 shadow-md hover:border-blue-500/70 hover:shadow-lg hover:shadow-blue-500/30"
        )}
        onClick={!isDisabled && !isSelecting ? onClick : undefined}
        whileHover={
          !isDisabled && !isSelecting
            ? {
                scale: 1.08,
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.2 },
              }
            : {}
        }
        whileTap={
          !isDisabled && !isSelecting
            ? { scale: 0.95, transition: { duration: 0.1 } }
            : {}
        }
        animate={
          isSelecting
            ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 0px rgba(59, 130, 246, 0)",
                ],
              }
            : {}
        }
        transition={
          isSelecting
            ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : { duration: 0.2 }
        }
      >
        {/* Animated background gradient */}
        <div
          className={cn(
            "absolute inset-0 opacity-50 transition-opacity duration-300",
            isSelecting && "animate-pulse"
          )}
          style={{
            background: isDisabled
              ? "radial-gradient(circle at center, rgba(239, 68, 68, 0.3) 0%, transparent 70%)"
              : isSelecting
                ? "radial-gradient(circle at center, rgba(59, 130, 246, 0.4) 0%, transparent 70%)"
                : isAvailable
                  ? "radial-gradient(circle at center, rgba(56, 189, 248, 0.3) 0%, transparent 70%)"
                  : "radial-gradient(circle at center, rgba(37, 99, 235, 0.3) 0%, transparent 70%)",
          }}
        />

        {/* Shimmer effect for loading state */}
        {isSelecting && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Shine effect on hover */}
        {!isDisabled && !isSelecting && (
          <motion.div
            className="absolute inset-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            whileHover={{
              left: "100%",
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
          {isSelecting ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative flex flex-col items-center gap-2"
            >
              {/* Animated spinner with glow */}
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                    scale: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="relative"
                >
                  <Loader2 className="h-6 w-6 text-blue-300 sm:h-7 sm:w-7" />
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(59, 130, 246, 0.5)",
                        "0 0 15px rgba(59, 130, 246, 0.8)",
                        "0 0 0px rgba(59, 130, 246, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
                {/* Orbiting dots */}
                {[0, 1, 2].map((i) => {
                  const angle = (i * 2 * Math.PI) / 3;
                  const radius = 20;
                  return (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400"
                      animate={{
                        x: [
                          Math.cos(angle) * radius,
                          Math.cos(angle + Math.PI * 2) * radius,
                          Math.cos(angle) * radius,
                        ],
                        y: [
                          Math.sin(angle) * radius,
                          Math.sin(angle + Math.PI * 2) * radius,
                          Math.sin(angle) * radius,
                        ],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  );
                })}
              </div>
              {/* Pulsing text */}
              <motion.span
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [0.95, 1, 0.95],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-[10px] font-semibold text-blue-200 sm:text-xs"
              >
                Selecting...
              </motion.span>
              {/* Progress dots */}
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-1 w-1 rounded-full bg-blue-400"
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Number */}
              <motion.div
                className={cn(
                  "text-xl font-bold sm:text-2xl md:text-3xl",
                  isDisabled
                    ? "text-red-200/70"
                    : isAvailable
                      ? "text-blue-100"
                      : "text-blue-100"
                )}
                animate={
                  isAvailable && !isSelecting
                    ? {
                        textShadow: [
                          "0 0 0px rgba(56, 189, 248, 0)",
                          "0 0 10px rgba(56, 189, 248, 0.5)",
                          "0 0 0px rgba(56, 189, 248, 0)",
                        ],
                      }
                    : {}
                }
                transition={
                  isAvailable
                    ? {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : {}
                }
              >
                {number}
              </motion.div>

              {/* Status icon */}
              {isDisabled && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mt-0.5"
                >
                  <XCircle className="h-3 w-3 text-red-400 sm:h-4 sm:w-4" />
                </motion.div>
              )}

              {isAvailable && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mt-0.5"
                >
                  <CheckCircle2 className="h-3 w-3 text-blue-400 sm:h-4 sm:w-4" />
                </motion.div>
              )}

              {/* Status text */}
              {isDisabled && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-0.5 text-[9px] font-medium text-red-300/80 sm:text-[10px]"
                >
                  Taken
                </motion.p>
              )}
            </>
          )}
        </div>

        {/* Border glow effect */}
        {!isDisabled && !isSelecting && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              boxShadow: isAvailable
                ? "inset 0 0 10px rgba(56, 189, 248, 0.3)"
                : "inset 0 0 10px rgba(37, 99, 235, 0.3)",
            }}
            whileHover={{
              boxShadow: isAvailable
                ? "inset 0 0 20px rgba(56, 189, 248, 0.5)"
                : "inset 0 0 20px rgba(37, 99, 235, 0.5)",
            }}
          />
        )}

        {/* Particle effect on click (for available tiles) */}
        {isAvailable && !isSelecting && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={false}
            whileTap={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400"
              initial={{ scale: 0, opacity: 1 }}
              whileTap={{
                scale: [0, 4, 0],
                opacity: [1, 0.5, 0],
                transition: { duration: 0.6 },
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
