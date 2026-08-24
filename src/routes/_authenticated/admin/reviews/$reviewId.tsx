import { createFileRoute, notFound } from "@tanstack/react-router";
import { idParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute("/_authenticated/admin/reviews/$reviewId")(
	{
		head: () => ({
			meta: [
				{
					title: "Review",
				},
			],
		}),
		params: {
			parse: (params) => {
				const result = idParamSchema.safeParse({ id: params.reviewId });
				if (!result.success) {
					throw notFound();
				}
				return {
					reviewId: result.data.id,
				};
			},
		},
	},
);
