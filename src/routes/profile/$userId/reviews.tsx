import { createFileRoute, redirect } from "@tanstack/react-router";
import { userReviewsQueryOptions } from "@/features/review/hooks/query-options";
import { paginationSchema } from "@/features/shared/schemas/pagination.schema";
import { getValidPage } from "@/lib/utils";

export const Route = createFileRoute("/profile/$userId/reviews")({
	staticData: {
		getTitle: () => "Reviews",
	},
	validateSearch: paginationSchema,
	beforeLoad: async ({ context, params, search }) => {
		const { page, size } = search;
		const data = await context.queryClient.ensureQueryData(
			userReviewsQueryOptions(params.userId, { page, size }),
		);

		const correctPage = getValidPage(search.page, data.totalPages);
		if (correctPage) {
			throw redirect({
				to: "/profile/$userId/reviews",
				params: { userId: params.userId },
				search: {
					...search,
					page: correctPage,
				},
				replace: true,
			});
		}
	},
});
