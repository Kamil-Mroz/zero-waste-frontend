import { z } from "zod/v4";

export const createBlogFormSchema = z.object({
	title: z.string().nonempty(),
	description: z.string().nonempty(),
	content: z.string().nonempty(),
});
