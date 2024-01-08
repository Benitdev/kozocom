import { SparklesCore } from "~/components/ui/sparktles";
import { Spotlight } from "~/components/ui/sportlight";

type Props = {
  headingContent: string;
  isShowParticles?: boolean;
};

export function Hero({ headingContent, isShowParticles = true }: Props) {
  return (
    <div className="relative pt-[10rem] bg-dot-white/20">
      <Spotlight
        className="left-0 top-40 md:-top-20 md:left-60"
        fill="rgb(14 165 233)"
      />
      <div className="heading-animation relative z-20 text-center text-xl font-bold uppercase text-white md:text-3xl lg:text-5xl">
        <h2>{headingContent}</h2>
        <h2 className="absolute inset-0">{headingContent}</h2>
      </div>
      <div className="relative h-48 w-full">
        <div className="absolute left-1/2 top-0 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
        <div className="absolute left-1/2 top-0  h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute inset-x-[50%] top-0 h-[5px] w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
        <div className="absolute inset-x-[50%] top-0 h-px w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        {isShowParticles && (
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="h-full w-full"
            particleColor="#FFFFFF"
          />
        )}

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(400px_250px_at_top,transparent_50%,white)]"></div>
      </div>
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
    </div>
  );
}
