import { createFileRoute } from "@tanstack/react-router";
import { paginationSchema } from "@/features/shared/schemas/pagination.schema";

export const Route = createFileRoute("/_authenticated/reviews/_layout")({
	validateSearch: paginationSchema,
});
