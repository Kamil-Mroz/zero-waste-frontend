import { z } from "zod/v4";
export const categorySchema = z.object({
	name: z
		.string()
		.nonempty("Category name is required")
		.regex(
			/^[\p{L}]+(?: [\p{L}]+)*$/u,
			"Category name can contain only letters",
		),
	categoryId: z.string(),
});

export const categorySearchSchema = z.object({
	modal: z.enum(["create", "edit", "delete"]).optional().catch("create"),
	categoryId: z.uuid().optional().catch(""),
});
