import { z } from "zod/v4";

export const reportSchema = z.object({
	subjectId: z.uuid(),
	subjectType: z.enum(["ITEM", "USER", "REVIEW", "BLOG"]),
	reason: z.enum([
		"SPAM",
		"HARASSMENT",
		"INAPPROPRIATE_CONTENT",
		"COPYRIGHT",
		"FRAUD",
		"MISINFORMATION",
		"OTHER",
	]),
	comment: z
		.string()
		.max(255, "Comment can not exceed 255 characters")
		.optional(),
});

export const reportRejectSchema = z.object({
	adminNote: z.string().nonempty("Note is required"),
});

export const reportResolveSchema = z.object({
	action: z.enum(["REMOVE", "BAN", "HIDE"]),
	adminNote: z
		.string()
		.max(255, "Admin note can not exceed 255 characters")
		.nonempty("Note is required"),
});
