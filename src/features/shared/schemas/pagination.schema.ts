import { z } from "zod/v4";
import { PAGE_SIZES } from "../constants";

export const paginationSchema = z.object({
	page: z.coerce.number().nonnegative().optional().catch(0),
	size: z.coerce
		.number()
		.nonnegative()
		.refine((val) => PAGE_SIZES.includes(val), {
			error: "pageSize must be 10, 20, 25, 30, 40 or 50",
		})
		.optional()
		.catch(PAGE_SIZES[1]),
});
