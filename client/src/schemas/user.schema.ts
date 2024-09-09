import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
  gender: z.string({ required_error: "Gender is required" }),
  role: z.string({ required_error: "Role is required" }),
  image: z.custom<File>((value) => value instanceof File, {
      message: "Image is required and must be a file",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, "Max file size is 2MB")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "Only .jpg and .png files are accepted"
    ),

    
});
