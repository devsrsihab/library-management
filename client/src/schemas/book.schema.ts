import { z } from "zod";
export const getBookValidationSchema = (userRole: string) => {
  return z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(1, "Name cannot be empty"),
    author:
      userRole === "author"
        ? z.string().optional()
        : z
            .string({ required_error: "Author is required" })
            .min(1, "Author cannot be empty"),
    category: z
      .string({ required_error: "Category is required" })
      .min(1, "Category cannot be empty"),
    quantity: z
      .string({ required_error: "Quantity is required" })
      .min(1, "Quantity cannot be empty")
      .refine((value) => /^[0-9]+$/.test(value), {
        message: "Quantity must be a numeric value",
      }),
    shortDescription: z
      .string({ required_error: "Description is required" })
      .min(1, "Description cannot be empty"),
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
};

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
