"use server";

import { headers } from "next/headers";

import { revalidatePath } from "next/cache";
import db from "~/lib/db";
import { getPageSession } from "~/lib/auth";

export async function vote(voteId: string) {
  const session = await getPageSession();

  if (!session) {
    return new Response(null, {
      status: 401,
      headers: {
        Location: "/login",
      },
    });
  }

  const header = headers();
  const ipAddress = (header.get("x-forwarded-for") ?? "127.0.0.1").split(
    ","
  )[0];

  try {
    await db.vote.create({
      data: {
        userId: session.user.userId,
        ipAddress,
        votedId: voteId,
      },
    });
    revalidatePath("/end-of-year");
  } catch (e) {
    console.log(e);
  }
}

export async function removeVoteTable() {
  await db.vote.deleteMany({});
}
