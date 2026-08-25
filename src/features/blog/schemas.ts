import { z } from "zod/v4";

export const blogFormSchema = z.object({
	title: z
		.string()
		.nonempty("Title is required")
		.max(255, "Title cannot exceed 255 characters"),

	description: z
		.string()
		.max(255, "Description can not exceed  255 characters")
		.nonempty(),
	content: z.string().nonempty("Content is required"),
});
