"use server";

import * as z from "zod";
import { registerSchema } from "../_schemas/registerSchema";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function register(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { nickname, email, password } = values;

  const lowerCaseEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);

  // Make sure email is not already used
  const existingUser = await prisma.user.findUnique({
    where: { email: lowerCaseEmail },
  });

  if (existingUser) {
    return { error: "Email already used" };
  }

  await prisma.user.create({
    data: {
      nickname,
      email: lowerCaseEmail,
      password: hashedPassword,
    },
  });

  return { success: true };
}
