import { isNumberSelected } from "~/lib/google-sheets";
import { z } from "zod";

const checkSchema = z.object({
  number: z.number().int().min(1).max(100),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { number } = checkSchema.parse(body);

    const isSelected = await isNumberSelected(number);

    return Response.json({
      number,
      isSelected,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: "Invalid number. Must be between 1 and 100." },
        { status: 400 }
      );
    }

    console.error("Error checking number:", error);
    return Response.json(
      { error: "Failed to check number status" },
      { status: 500 }
    );
  }
}
