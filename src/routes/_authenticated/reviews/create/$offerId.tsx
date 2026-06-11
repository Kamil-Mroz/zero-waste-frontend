import { createFileRoute, notFound } from "@tanstack/react-router";
import { ReviewCreateForm } from "@/features/review/components/review-create-form";
import { offerParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute("/_authenticated/reviews/create/$offerId")(
	{
		component: RouteComponent,
		params: {
			parse: (params) => {
				const result = offerParamSchema.safeParse(params);
				if (!result.success) {
					throw notFound();
				}
				return {
					offerId: result.data.offerId,
				};
			},
		},
	},
);

function RouteComponent() {
	const { offerId } = Route.useParams();
	return <ReviewCreateForm offerId={offerId} />;
}
