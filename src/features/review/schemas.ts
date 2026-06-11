import { z } from "zod/v4";

export const createReviewFormSchema = z.object({
	comment: z.string(),
	rating: z.number().min(1).max(5),
	offerId: z.uuid(),
});
