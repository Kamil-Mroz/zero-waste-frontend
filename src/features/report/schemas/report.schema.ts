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
	comment: z.string().optional(),
});
