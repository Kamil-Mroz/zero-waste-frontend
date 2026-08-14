import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod/v4";
import { receivedOffersQueryOptions } from "@/features/offer/hooks/query-options";
import { offerSearchSchema } from "@/features/offer/schemas/offer.schema";
import { getValidPage } from "@/lib/utils";

const receivedOffersSearchSchema = z.object({
	...offerSearchSchema.shape,
	modal: z.enum(["reject", "accept"]).optional().catch("accept"),
	offerId: z.uuid().optional().catch(""),
});
export const Route = createFileRoute("/_authenticated/offers/received")({
	head: () => ({
		meta: [
			{
				title: "Received offers",
			},
		],
	}),
	staticData: {
		getTitle: () => "Received",
	},
	validateSearch: receivedOffersSearchSchema,
	loaderDeps: ({ search }) => {
		const { modal, offerId, page, size, status } = search;
		return { modal, offerId, page, size, status };
	},

	loader: async ({ context, deps: search }) => {
		const page = await context.queryClient.ensureQueryData(
			receivedOffersQueryOptions(search),
		);

		const correctPage = getValidPage(search.page, page.totalPages);
		if (correctPage) {
			throw redirect({
				to: "/offers/received",
				search: {
					...search,
					page: correctPage,
				},
				replace: true,
			});
		}
	},
});
