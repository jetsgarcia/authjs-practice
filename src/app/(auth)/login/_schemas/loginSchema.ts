import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});
