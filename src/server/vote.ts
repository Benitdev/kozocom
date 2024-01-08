"use server";

import { headers } from "next/headers";

import { revalidatePath } from "next/cache";
import db from "~/lib/db";

export async function vote(data: string) {
  const header = headers();
  const ipAddress = (header.get("x-forwarded-for") ?? "127.0.0.1").split(
    ","
  )[0];

  try {
    await db.vote.create({
      data: {
        userId: "ahihi",
        ipAddress,
        votedId: data,
      },
    });
    revalidatePath("/end-of-year");
  } catch (e) {
    console.log(e);
  }
}
