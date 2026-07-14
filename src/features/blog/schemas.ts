import { z } from "zod/v4";

export const blogFormSchema = z.object({
	title: z.string().nonempty(),
	description: z.string().nonempty(),
	content: z.string().nonempty(),
});
