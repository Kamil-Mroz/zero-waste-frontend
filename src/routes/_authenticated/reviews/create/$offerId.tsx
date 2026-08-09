import { createFileRoute, notFound } from "@tanstack/react-router";
import { idParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute("/_authenticated/reviews/create/$offerId")(
	{
		params: {
			parse: (params) => {
				const result = idParamSchema.safeParse({ id: params.offerId });
				if (!result.success) {
					throw notFound();
				}
				return {
					offerId: result.data.id,
				};
			},
		},
	},
);
