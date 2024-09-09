import { z } from "zod";

export const bookValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  author: z.string({ required_error: "Author is required" }),
  category: z.string({ required_error: "Category is required" }),
  quantity: z
    .string({ required_error: "Quantity is required" })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "Quantity must be a numeric value",
    }),
  shortDescription: z.string({ required_error: "Description is required" }),
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

export const bookEditValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  author: z.string({ required_error: "Author is required" }),
  category: z.string({ required_error: "Category is required" }),
  quantity: z
    .string({ required_error: "Quantity is required" })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "Quantity must be a numeric value",
    }),
  shortDescription: z.string({ required_error: "Description is required" }),
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
