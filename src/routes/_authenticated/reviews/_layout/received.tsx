import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Suspense } from "react";
import { ReviewList } from "@/features/review/components/review-list";
import { ReviewsSkeleton } from "@/features/review/components/reviews-skeleton";
import { ReceivedReviewsQueryOptions } from "@/features/review/hooks/query-options";
import { getValidPage, withDefaultPageable } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/reviews/_layout/received")({
	pendingComponent: ReviewsSkeleton,
	component: RouteComponent,
	staticData: {
		getTitle: () => "Received",
	},
	beforeLoad: async ({ context, search }) => {
		const { page, size } = search;
		const data = await context.queryClient.ensureQueryData(
			ReceivedReviewsQueryOptions({ page, size }),
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
		ReceivedReviewsQueryOptions(pageable),
	);

	return <ReviewList reviews={reviews} pageable={pageable} />;
}
