import { z } from "zod/v4";

export const itemFormSchema = z.object({
	title: z.string().nonempty("Title is required"),
	description: z.string().nonempty("Description is required"),
	condition: z.enum(["NEW", "REPAIRED", "DAMAGED", "OLD"]),
	categoryId: z.string().nonempty("Category is required"),
	city: z.string().nonempty("City is required"),
});
