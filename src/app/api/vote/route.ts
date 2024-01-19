import db from "~/lib/db";

export const POST = async (request: Request) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { userId } = request.body as any;
  const res = await db.vote.findFirst({
    where: {
      userId,
    },
  });
  return new Response(JSON.stringify({ res }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
