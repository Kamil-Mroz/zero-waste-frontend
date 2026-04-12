import { z } from "zod/v4";
export const redirectSchema = z.object({
	redirect: z.string().optional().default("/"),
});
