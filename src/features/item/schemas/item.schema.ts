import { z } from "zod/v4";
import { paginationSchema } from "@/features/shared/schemas/pagination.schema";

export const baseItemSearchSchema = z.object({
	...paginationSchema.shape,
	text: z.string().optional().catch(""),
	category: z.uuid().optional().catch(""),
});

export const itemStateSchema = z.enum(["AVAILABLE", "GIVEN", "PENDING"]);

export const ownItemSearchSchema = baseItemSearchSchema.extend({
	states: z.array(itemStateSchema).default(["AVAILABLE", "PENDING"]),
});

export const itemFormStateSchema = z.enum(["AVAILABLE", "PENDING"]);
export const itemConditionSchema = z.enum([
	"NEW",
	"REPAIRED",
	"DAMAGED",
	"OLD",
]);

export const createItemFormSchema = z.object({
	title: z.string().nonempty("Title is required"),
	description: z.string().nonempty("Description is required"),
	condition: itemConditionSchema,
	state: itemFormStateSchema,
	categoryId: z.string().nonempty("Category is required"),
	city: z.string().nonempty("City is required"),
	thumbnail: z
		.discriminatedUnion("type", [
			z.object({
				type: z.literal("existing"),
				id: z.uuid(),
			}),
			z.object({
				type: z.literal("new"),
				file: z.file(),
			}),
		])
		.nullable(),
	images: z
		.array(z.instanceof(File))
		.refine(
			(files) =>
				files.every((file) => ["image/jpeg", "image/png"].includes(file.type)),
			"Only JPG and PNG files are allowed",
		)
		.refine(
			(files) => files.every((f) => f.size <= 2 * 1024 * 1024),
			"Each file must be under 2MB",
		)
		.max(5, "Can upload up to 5 images max"),
});

export const updateItemFormSchema = (currentImageIds: string[]) =>
	z
		.object({
			title: z.string().nonempty("Title is required"),
			description: z.string().nonempty("Description is required"),
			condition: itemConditionSchema,
			state: itemFormStateSchema,
			categoryId: z.string().nonempty("Category is required"),
			city: z.string().nonempty("City is required"),

			thumbnail: z
				.discriminatedUnion("type", [
					z.object({
						type: z.literal("existing"),
						id: z.uuid(),
					}),
					z.object({
						type: z.literal("new"),
						file: z.file(),
					}),
				])
				.nullable(),
			images: z
				.array(z.instanceof(File))
				.refine(
					(files) =>
						files.every((file) =>
							["image/jpeg", "image/png"].includes(file.type),
						),
					"Only JPG and PNG files are allowed",
				)
				.refine(
					(files) => files.every((f) => f.size <= 2 * 1024 * 1024),
					"Each file must be under 2MB",
				)
				.max(5, "Can upload up to 5 images max"),
			removedImageIds: z.array(z.uuid("Must be a valid image id")),
		})
		.superRefine((data, ctx) => {
			const keptCount = currentImageIds.filter(
				(id) => !data.removedImageIds.includes(id),
			).length;
			const total = keptCount + data.images.length;
			if (total > 5) {
				ctx.addIssue({
					code: "custom",
					path: ["images"],
					message: "Max 5 images total",
				});
			}
		});
