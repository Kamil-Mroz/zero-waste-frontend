import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ReviewList } from "@/features/review/components/review-list";
import { ReviewsSkeleton } from "@/features/review/components/reviews-skeleton";
import { ReceivedReviewsQueryOptions } from "@/features/review/hooks/query-options";
import { withDefaultPageable } from "@/lib/utils";

export const Route = createLazyFileRoute(
	"/_authenticated/reviews/_layout/received",
)({
	pendingComponent: ReviewsSkeleton,
	component: RouteComponent,
});

function RouteComponent() {
	const { page, size } = Route.useSearch();
	const pageable = withDefaultPageable({ page, size });

	const { data: reviews } = useSuspenseQuery(
		ReceivedReviewsQueryOptions(pageable),
	);

	return <ReviewList reviews={reviews} pageable={pageable} />;
}
