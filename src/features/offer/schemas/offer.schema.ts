import { paginationSchema } from "@/features/shared/schemas/pagination.schema";
import { z } from "zod/v4";

export const offerStatusSchema = z.enum([
	"PENDING",
	"ACCEPTED",
	"REJECTED",
	"CANCELLED",
]);

export const offerSearchSchema = z.object({
  status: offerStatusSchema.optional().catch("PENDING"),
	...paginationSchema.shape,
});
