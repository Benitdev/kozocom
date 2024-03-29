"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "~/app/end-of-year/_components/header";
import { Hero } from "~/app/end-of-year/_components/hero";
import { VoteForm } from "~/app/end-of-year/_components/vote-form";
import FireWork from "~/components/shared/firework";

export default function EndOfYearPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState("initial");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        setSession(data);
      } catch (error) {
        router.push("/login");
      }
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!session) return;
    const checkVoted = async () => {
      try {
        setIsLoading("loading");
        const res = await fetch("/api/vote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: session.user.id }),
        });
        const data = await res.json();
        if (data) setIsVoted(data);
        setIsLoading("stopped");
      } catch (error) {
        setIsLoading("stopped");
      }
    };
    checkVoted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <section className="space-y-4 px-5 pb-20">
      <Header />
      <Hero
        headingContent="vote on musical performances
"
      />
      {isLoading === "stopped" &&
        (isVoted ? (
          <p className="text-center text-sm font-bold uppercase text-blue-400 md:text-base lg:text-xl">
            THANK YOU FOR VOTING!
          </p>
        ) : (
          <VoteForm />
        ))}
    </section>
  );
}
