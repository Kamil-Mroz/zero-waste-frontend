import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod/v4";
import OfferDialog from "@/features/offer/components/offer-dialog";
import OfferTable from "@/features/offer/components/offer-table";
import { ownColumns } from "@/features/offer/hooks/columns";
import { ownOffersQueryOptions } from "@/features/offer/hooks/query-options";
import { offerSearchSchema } from "@/features/offer/schemas/offer.schema";
import { useFilters } from "@/features/shared/hooks/use-filters";
import type { Pageable } from "@/features/shared/types";
import { withDefaultPageable } from "@/lib/utils";

const ownOffersSearchSchema = z.object({
	...offerSearchSchema.shape,
	modal: z.enum(["cancel"]).optional().catch("cancel"),
	offerId: z.uuid().optional().catch(""),
});

export const Route = createFileRoute("/_authenticated/offers/own")({
	component: RouteComponent,
	validateSearch: ownOffersSearchSchema,
	staticData: {
		getTitle: () => "Own",
	},
	loaderDeps: ({ search }) => ({ search }),
	loader: async ({ context, deps: { search } }) => {
		const page = await context.queryClient.ensureQueryData(
			ownOffersQueryOptions(search),
		);
		if (page.totalPages > 0 && search.page && search.page >= page.totalPages) {
			throw redirect({
				to: "/offers/own",
				search: {
					...search,
					page: page.totalPages - 1,
				},
				replace: true,
			});
		}
	},
});

function RouteComponent() {
	const search = Route.useSearch();

	const routeId = "/_authenticated/offers/own";
	const { setFilters } = useFilters(routeId);

	const pageable = withDefaultPageable(search);

	const { data: page } = useSuspenseQuery(ownOffersQueryOptions(search));
	return (
		<div>
			<OfferTable
				data={page.content}
				columns={ownColumns}
				pagination={{
					pageIndex: pageable.page,
					pageSize: pageable.size,
				}}
				paginationOptions={{
					pageCount: page.totalPages,
					onPaginationChange: (pagination) => {
						let paginationState: Pageable;
						if (typeof pagination === "function") {
							const paginationValue = pagination({
								pageIndex: pageable.page,
								pageSize: pageable.size,
							});

							paginationState = {
								page: paginationValue.pageIndex,
								size: paginationValue.pageSize,
							};
						} else {
							paginationState = {
								page: pagination.pageIndex,
								size: pagination.pageSize,
							};
						}
						setFilters(paginationState);
					},
				}}
			/>
			<OfferDialog routeId={routeId} />
		</div>
	);
}
