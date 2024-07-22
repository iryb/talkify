import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type signUp = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type signIn = z.infer<typeof SignInSchema>;
