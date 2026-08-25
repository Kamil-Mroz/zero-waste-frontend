import { createLazyFileRoute } from "@tanstack/react-router";
import { ReviewCreateForm } from "@/features/review/components/review-create-form";
import GoBackButton from "@/features/shared/components/go-back-button";

export const Route = createLazyFileRoute(
	"/_authenticated/reviews/create/$offerId",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { offerId } = Route.useParams();
	return (
		<div className="flex flex-col h-full items-center justify-center">
			<div className="w-full max-w-md space-y-2">
				<GoBackButton />
				<ReviewCreateForm offerId={offerId} />
			</div>
		</div>
	);
}
