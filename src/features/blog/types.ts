import type { z } from "zod/v4";
import type { ModerationStatus } from "../shared/types";
import type { UserSummary } from "../users/types";
import type { blogFormSchema } from "./schemas";

export type BlogFormValues = z.infer<typeof blogFormSchema>;

export type BlogType = {
	id: string;
	author: UserSummary;
	title: string;
	content: string;
	description: string;
	moderationStatus: ModerationStatus;
};
