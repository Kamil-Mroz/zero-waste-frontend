import { z } from "zod/v4";
export const categorySchema = z.object({
	name: z.string().nonempty("Category name is required"),
	categoryId: z.string(),
});
