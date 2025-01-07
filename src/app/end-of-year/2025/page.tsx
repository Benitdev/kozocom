import { FavoriteEmployees } from "~/app/end-of-year/2025/_components/FavoriteEmployees";
import Header from "~/app/end-of-year/_components/header";
import { Hero } from "~/app/end-of-year/_components/hero";

export default function EndOfYear2025Page() {
  return (
    <section className="relative h-screen space-y-4 overflow-hidden px-5 pb-20">
      <Header />
      <Hero headingContent="FAVORITE EMPLOYEE OF THE YEAR 2024" />
      <FavoriteEmployees />
      <div className="pointer-events-none absolute -left-[20%] top-[15%] h-32 w-[70rem] -rotate-45 bg-orange-600/60 bg-gradient-to-tr blur-[200px]"></div>
      <div className="pointer-events-none absolute -right-[20%] bottom-[15%] h-[10rem] w-[60rem] rotate-45 bg-yellow-500/60 bg-gradient-to-tr blur-[130px]"></div>
    </section>
  );
}
