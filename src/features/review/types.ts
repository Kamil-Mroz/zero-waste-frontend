import type { z } from "zod/v4";
import type { ModerationStatus, Page } from "../shared/types";
import type { createReviewFormSchema } from "./schemas";

export type CreateReviewFormValues = z.infer<typeof createReviewFormSchema>;

export type Review = {
	id: string;
	rating: number;
	comment: string;
	reviewerId: string;
	revieweeId: string;
	reviewerName: string;
	createdAt: string;
	moderationStatus: ModerationStatus;
};

export type ReviewResponse = Page<Review[]>;
