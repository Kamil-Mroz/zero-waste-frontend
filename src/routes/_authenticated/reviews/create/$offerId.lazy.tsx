import { createLazyFileRoute } from "@tanstack/react-router";
import { ReviewCreateForm } from "@/features/review/components/review-create-form";

export const Route = createLazyFileRoute(
	"/_authenticated/reviews/create/$offerId",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { offerId } = Route.useParams();
	return <ReviewCreateForm offerId={offerId} />;
}
