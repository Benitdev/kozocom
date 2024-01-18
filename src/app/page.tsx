// import Features from "~/components/sections/features";
// import Hero from "~/components/sections/hero";
// import OpenSource from "~/components/sections/open-source";
// import Pricing from "~/components/sections/pricing";

import { redirect } from "next/navigation";
import { getPageSession } from "~/lib/auth";

export default async function Home() {
  const session = await getPageSession();

  if (!session) redirect("/login");
  return <></>;
}
