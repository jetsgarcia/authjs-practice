"use server";

import * as z from "zod";
import { registerSchema } from "../_schemas/registerSchema";

export async function register(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return null;
}
