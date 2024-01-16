"use client";

import { TEAMS } from "~/app/end-of-year/_components/vote-form";
import VoteItem from "~/app/end-of-year/_components/vote-item";

export default function CardList() {
  return (
    <div className="container mx-auto grid grid-cols-2 gap-x-6 gap-y-3">
      {TEAMS.map((team) => (
        <VoteItem
          key={team.id}
          id={team.id}
          title={team.title}
          image={team.image}
          description={team.description}
        />
      ))}
    </div>
  );
}
