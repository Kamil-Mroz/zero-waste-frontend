import { z } from "zod/v4";

export const idParamSchema = z.object({
	id: z.uuid({ error: "Invalid path param" }),
});
