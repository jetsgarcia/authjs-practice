"use server";

import * as z from "zod";
import { loginSchema } from "../_schemas/loginSchema";

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return null;
}
