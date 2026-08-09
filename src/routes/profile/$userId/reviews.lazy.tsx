import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { NotificationListSkeleton } from "@/features/notification/components/notification-list-skeleton";
import { ReviewList } from "@/features/review/components/review-list";
import { userReviewsQueryOptions } from "@/features/review/hooks/query-options";
import GoBackButton from "@/features/shared/components/go-back-button";
import { withDefaultPageable } from "@/lib/utils";

export const Route = createLazyFileRoute("/profile/$userId/reviews")({
	pendingComponent: NotificationListSkeleton,
	component: RouteComponent,
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
