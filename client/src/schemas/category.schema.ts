import { z } from "zod";

export const categoryValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  image: z
    .custom<File>((value) => value instanceof File, {
      message: "Image is required and must be a file",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, "Max file size is 2MB")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "Only .jpg and .png files are accepted"
    ),
});
