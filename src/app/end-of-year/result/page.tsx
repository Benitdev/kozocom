import { Hero } from "~/app/end-of-year/_components/hero";
import db from "~/lib/db";

export default async function VotingResultPage() {
  const record = await db.vote.findMany();

  return (
    <section className="space-y-4 px-5 pb-20">
      <Hero headingContent="kết quả bình chọn" isShowParticles={false} />
      <p>{JSON.stringify(record)}</p>
    </section>
  );
}
