import { createFileRoute, notFound } from "@tanstack/react-router";
import { reviewQueryOptions } from "@/features/review/hooks/query-options";

export const Route = createFileRoute(
	"/_authenticated/admin/reviews/$reviewId/",
)({
	staticData: {
		getTitle: () => "Review",
	},
	beforeLoad: async ({ context, params }) => {
		try {
			await context.queryClient.ensureQueryData(
				reviewQueryOptions(params.reviewId),
			);
		} catch {
			throw notFound();
		}
	},
});
