/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export const images = [
  "/images/seminar/Doan_Bao.jpeg",
  "/images/seminar/Qui_Thom.jpeg",
  "/images/seminar/Thien_Sang.png",
  "/images/seminar/ThienLP.jpeg",
  "/images/seminar/Trung.jpeg",
  "/images/seminar/TrungLT.jpeg",
  "/images/seminar/TuanNH.jpeg",
];

let posX: number = 0;
let posY: number = 0;

const ImageLibrary = () => {
  const currIndex = useRef(-1);
  const [imagesShowed, setImagesShowed] = useState<
    {
      index: number;
      x: number;
      y: number;
    }[]
  >([]);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      handleMouseMove({
        clientX: Math.random() * 1500 + 100,
        clientY: Math.random() * 700,
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    // if (Math.abs(e.clientX - posX) > 200 && Math.abs(e.clientY - posY) > 200) {
    currIndex.current =
      currIndex.current < images.length - 1 ? currIndex.current + 1 : 0;
    const current: number = currIndex.current;
    setImagesShowed((prev) => {
      return [
        ...prev,
        {
          index: current,
          x: e.clientX,
          y: e.clientY,
        },
      ];
    });
    setTimeout(() => {
      setImagesShowed((prev) => {
        prev.shift();
        return [...prev];
      });
    }, 1000);
    posX = e.clientX;
    posY = e.clientY;
    // }
  };

  return (
    <section
      id="image-library"
      className="absolute inset-0 -z-10 h-screen w-full cursor-grab overflow-hidden pb-[20vh] pt-[10vh]"
    >
      <motion.div
        ref={ref}
        className="mx-auto px-[15vw] text-[#e0ccbb]"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          duration: 1.5,
        }}
      >
        <h2 className="my-10 text-center text-[7vw] leading-none tracking-[10px] opacity-75">
          Best Seminar Presentation Award
        </h2>
      </motion.div>
      <motion.div
        className="absolute h-[8vw] w-[8vw] md:top-[40vh]"
        animate={{
          rotate: 360,
        }}
        transition={{
          type: "linear",
          duration: 10,
          repeat: Infinity,
        }}
      >
        <Image src={"/images/ornament.svg"} fill alt="" sizes="33vw"></Image>
      </motion.div>
      <AnimatePresence>
        {imagesShowed.map((image) => (
          <motion.div
            key={image.index}
            initial={{
              opacity: 0,
              scale: 0.5,
              left: image.x,
              top: image.y,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              left: image.x,
              top: image.y,
            }}
            exit={{
              opacity: 0,
              scale: 0.3,
            }}
            transition={{
              duration: 1,
              left: {
                type: "spring",
                damping: 40,
                stiffness: 70,
              },
              top: {
                type: "spring",
                damping: 40,
                stiffness: 70,
              },
            }}
            className="pointer-events-none absolute h-[300px] w-[250px]"
            style={{
              x: "-50%",
              y: "-50%",
            }}
          >
            <Image
              src={images[image.index]}
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};

export default ImageLibrary;
