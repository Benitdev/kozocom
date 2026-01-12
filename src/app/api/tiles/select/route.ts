import { selectNumber, isNumberSelected } from "~/lib/google-sheets";
import { z } from "zod";

const selectSchema = z.object({
  number: z.number().int().min(1).max(100),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { number } = selectSchema.parse(body);

    // Check if already selected first (this is faster than trying to write)
    const isSelected = await isNumberSelected(number);

    if (isSelected) {
      return Response.json(
        { error: "Number already selected", number, isSelected: true },
        { status: 409 }
      );
    }

    // Try to select the number (skip check since we already checked)
    const success = await selectNumber(number, true);

    if (!success) {
      // This shouldn't happen if check passed, but handle it anyway
      return Response.json(
        { error: "Number already selected", number, isSelected: true },
        { status: 409 }
      );
    }

    return Response.json({
      success: true,
      number,
      isSelected: false,
      message: "Number selected successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: "Invalid number. Must be between 1 and 100." },
        { status: 400 }
      );
    }

    console.error("Error selecting number:", error);
    return Response.json({ error: "Failed to select number" }, { status: 500 });
  }
}
