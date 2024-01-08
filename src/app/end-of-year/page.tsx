import { headers } from "next/headers";
import React from "react";
import { Hero } from "~/app/end-of-year/_components/hero";
import { VoteForm } from "~/app/end-of-year/_components/vote-form";
import db from "~/lib/db";

export default async function EndOfYearPage() {
  const header = headers();
  const ipAddress = (header.get("x-forwarded-for") ?? "127.0.0.1").split(
    ","
  )[0];

  await db.vote.findFirst({
    where: {
      ipAddress,
    },
  });

  // if (res)
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       Cám ơn bạn đã bình chọn tiết mục!
  //     </div>
  //   );

  return (
    <section className="space-y-4 px-5 pb-20">
      <Hero headingContent="bình chọn tiết mục văn nghệ" />
      <VoteForm />
    </section>
  );
}
