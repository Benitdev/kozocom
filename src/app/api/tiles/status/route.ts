import { getAllNumbersStatus } from "~/lib/google-sheets";

export async function GET() {
  try {
    const status = await getAllNumbersStatus();
    return Response.json({ status });
  } catch (error) {
    console.error("Error getting numbers status:", error);
    return Response.json(
      { error: "Failed to get numbers status" },
      { status: 500 }
    );
  }
}
