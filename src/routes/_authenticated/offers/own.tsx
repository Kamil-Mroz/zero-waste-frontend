import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod/v4";
import { ownOffersQueryOptions } from "@/features/offer/hooks/query-options";
import { offerSearchSchema } from "@/features/offer/schemas/offer.schema";
import { getValidPage } from "@/lib/utils";

const ownOffersSearchSchema = z.object({
	...offerSearchSchema.shape,
	modal: z.enum(["cancel"]).optional().catch("cancel"),
	offerId: z.uuid().optional().catch(""),
});

export const Route = createFileRoute("/_authenticated/offers/own")({
	head: () => ({
		meta: [
			{
				title: "Own offers",
			},
		],
	}),
	validateSearch: ownOffersSearchSchema,
	staticData: {
		getTitle: () => "Own",
	},
	loaderDeps: ({ search }) => {
		const { modal, offerId, page, size, status } = search;
		return { modal, offerId, page, size, status };
	},
	loader: async ({ context, deps: search }) => {
		const page = await context.queryClient.ensureQueryData(
			ownOffersQueryOptions(search),
		);

		const correctPage = getValidPage(search.page, page.totalPages);
		if (correctPage) {
			throw redirect({
				to: "/offers/own",
				search: {
					...search,
					page: correctPage,
				},
				replace: true,
			});
		}
	},
});
