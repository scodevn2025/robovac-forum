import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  geoFlag: z.enum(["GLOBAL", "DE", "GB", "IT", "FR"]).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const threadSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  content: z.string().min(10, "Content must be at least 10 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  prefix: z.string().optional(),
  geoFlag: z.enum(["GLOBAL", "DE", "GB", "IT", "FR"]).optional(),
  featureImage: z.string().optional(),
  modelTypeId: z.string().optional(),
});

export const postSchema = z.object({
  content: z.string().min(1, "Content cannot be empty"),
});

export type LoginInput = z.input<typeof loginSchema>;
export type RegisterInput = z.input<typeof registerSchema>;
export type ThreadInput = z.input<typeof threadSchema>;
export type PostInput = z.input<typeof postSchema>;
