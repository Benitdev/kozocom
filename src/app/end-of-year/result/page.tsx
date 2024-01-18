import Header from "~/app/end-of-year/_components/header";
import { Hero } from "~/app/end-of-year/_components/hero";
import CardList from "~/app/end-of-year/result/_components/card-list";
import db from "~/lib/db";

export default async function VotingResultPage() {
  const record = await db.vote.findMany({
    where: {
      OR: [
        { votedId: "1" },
        { votedId: "2" },
        { votedId: "3" },
        { votedId: "4" },
      ],
    },
  });

  const groupedRecord = record.reduce(
    (acc: { [key: string]: typeof record }, curr) => {
      const votedId = curr.votedId;
      if (!acc[votedId]) {
        acc[votedId] = [];
      }
      acc[votedId].push(curr);
      return acc;
    },
    {}
  );

  return (
    <section className="flex h-screen flex-col space-y-4 overflow-hidden px-5 pb-5">
      <Header />
      <Hero headingContent="kết quả bình chọn" isShowParticles={false} />
      <CardList groupedRecord={groupedRecord} />
    </section>
  );
}
