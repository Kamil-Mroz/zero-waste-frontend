import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ReviewList } from "@/features/review/components/review-list";
import { ReviewsSkeleton } from "@/features/review/components/reviews-skeleton";
import { GivenReviewsQueryOptions } from "@/features/review/hooks/query-options";
import { withDefaultPageable } from "@/lib/utils";

export const Route = createLazyFileRoute(
	"/_authenticated/reviews/_layout/given",
)({
	pendingComponent: ReviewsSkeleton,
	component: RouteComponent,
});

function RouteComponent() {
	const { page, size } = Route.useSearch();
	const pageable = withDefaultPageable({ page, size });

	const { data: reviews } = useSuspenseQuery(
		GivenReviewsQueryOptions(pageable),
	);

	return <ReviewList reviews={reviews} isOwn pageable={pageable} />;
}
