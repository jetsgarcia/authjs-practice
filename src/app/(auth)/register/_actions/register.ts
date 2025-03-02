"use server";

import * as z from "zod";
import { registerSchema } from "../_schemas/registerSchema";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function register(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { nickname, email, password } = values;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already used" };
  }

  await db.user.create({
    data: {
      nickname,
      email,
      password: hashedPassword,
    },
  });

  return { success: true };
}
