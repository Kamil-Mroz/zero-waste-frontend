import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ReviewList } from "@/features/review/components/review-list";
import { userReviewsQueryOptions } from "@/features/review/hooks/query-options";
import GoBackButton from "@/features/shared/components/go-back-button";
import { paginationSchema } from "@/features/shared/schemas/pagination.schema";
import { getValidPage, withDefaultPageable } from "@/lib/utils";

export const Route = createFileRoute("/profile/$userId/reviews")({
	staticData: {
		getTitle: () => "Reviews",
	},
	component: RouteComponent,
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

function RouteComponent() {
	const { userId } = Route.useParams();
	const { page, size } = Route.useSearch();
	const pageable = withDefaultPageable({ page, size });
	const { data: reviews } = useSuspenseQuery(
		userReviewsQueryOptions(userId, pageable),
	);

	return (
		<div className="space-y-2">
			<GoBackButton />
			<ReviewList reviews={reviews} pageable={pageable} />
		</div>
	);
}
