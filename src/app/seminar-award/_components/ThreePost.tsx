import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "~/app/seminar-award/_components/ImageLibrary";

function ThreePost() {
  return (
    <div className="grid h-4/5 w-4/5 grid-cols-3 gap-6">
      <motion.div
        layoutId="poster1"
        // initial={{
        //   x: 200,
        //   opacity: 0,
        // }}
        // animate={{
        //   x: 0,
        //   opacity: 1,
        // }}
        // transition={{
        //   duration: 1,
        //   type: "easeIn",
        // }}
        className="relative overflow-hidden rounded-xl"
      >
        <Image src={images[0]} fill alt="" sizes="33vw"></Image>
      </motion.div>
      <motion.div
        layoutId="poster2"
        // initial={{
        //   y: 200,
        //   x: 100,
        //   opacity: 0,
        // }}
        // animate={{
        //   y: 0,
        //   x: 0,
        //   opacity: 1,
        // }}
        // transition={{
        //   duration: 1,
        // }}
        className="relative overflow-hidden rounded-xl"
      >
        <Image src={images[0]} fill alt="" sizes="33vw"></Image>
      </motion.div>
      <motion.div
        layoutId="poster3"
        // initial={{
        //   y: 200,
        //   x: -100,
        //   opacity: 0,
        // }}
        // animate={{
        //   y: 0,
        //   x: 0,
        //   opacity: 1,
        // }}
        // transition={{
        //   duration: 1,
        // }}
        className="relative overflow-hidden rounded-xl"
      >
        <Image src={images[0]} fill alt="" sizes="33vw"></Image>
      </motion.div>
    </div>
  );
}

export default ThreePost;
