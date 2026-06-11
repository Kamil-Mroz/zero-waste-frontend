import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ReviewList } from "@/features/review/components/review-list";
import { ReviewsSkeleton } from "@/features/review/components/reviews-skeleton";
import { GivenReviewsQueryOptions } from "@/features/review/hooks/query-options";
import { getValidPage, withDefaultPageable } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/reviews/_layout/given")({
	pendingComponent: ReviewsSkeleton,
	component: RouteComponent,
	staticData: {
		getTitle: () => "Given",
	},

	beforeLoad: async ({ context, search }) => {
		const { page, size } = search;
		const data = await context.queryClient.ensureQueryData(
			GivenReviewsQueryOptions({ page, size }),
		);

		const correctPage = getValidPage(search.page, data.totalPages);
		if (correctPage) {
			throw redirect({
				to: ".",
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
	const { page, size } = Route.useSearch();
	const pageable = withDefaultPageable({ page, size });

	const { data: reviews } = useSuspenseQuery(
		GivenReviewsQueryOptions(pageable),
	);

	return <ReviewList reviews={reviews} pageable={pageable} />;
}
