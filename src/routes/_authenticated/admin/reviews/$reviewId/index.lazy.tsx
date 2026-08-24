import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ProfileReviewCard } from "@/features/profile/components/profile-review-card";
import { reviewQueryOptions } from "@/features/review/hooks/query-options";

export const Route = createLazyFileRoute(
	"/_authenticated/admin/reviews/$reviewId/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { reviewId } = Route.useParams();
	const { data } = useSuspenseQuery(reviewQueryOptions(reviewId));
	return <ProfileReviewCard review={data}  />;
}
