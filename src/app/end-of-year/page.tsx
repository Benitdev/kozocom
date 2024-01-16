import { redirect } from "next/navigation";
import React from "react";
import Header from "~/app/end-of-year/_components/header";
import { Hero } from "~/app/end-of-year/_components/hero";
import { VoteForm } from "~/app/end-of-year/_components/vote-form";
import { getPageSession } from "~/lib/auth";
import db from "~/lib/db";

export default async function EndOfYearPage() {
  const session = await getPageSession();

  if (!session) redirect("/login");

  const res = await db.vote.findFirst({
    where: {
      userId: session.userId,
    },
  });

  return (
    <section className="space-y-4 px-5 pb-20">
      <Header />
      <Hero headingContent="bình chọn tiết mục văn nghệ" />
      {res ? (
        <p className="text-center text-xl font-bold uppercase text-blue-400">
          Cám ơn bạn đã bình chọn!
        </p>
      ) : (
        <VoteForm />
      )}
    </section>
  );
}
