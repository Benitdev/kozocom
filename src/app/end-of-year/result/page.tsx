import Header from "~/app/end-of-year/_components/header";
import { Hero } from "~/app/end-of-year/_components/hero";
import CardList from "~/app/end-of-year/result/_components/card-list";
import db from "~/lib/db";

export default async function VotingResultPage() {
  const record = await db.vote.findMany();

  return (
    <section className="space-y-4 px-5 pb-20">
      <Header />
      <Hero headingContent="kết quả bình chọn" isShowParticles={false} />
      <CardList />
      {/* <p>{JSON.stringify(record)}</p> */}
    </section>
  );
}
