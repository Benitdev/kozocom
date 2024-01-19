import { getPageSession } from "~/lib/auth";

export const GET = async () => {
  const session = await getPageSession();
  if (session) {
    return new Response(JSON.stringify(session), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return new Response(null, {
    status: 401,
  });
};
