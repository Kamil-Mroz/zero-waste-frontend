import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import OfferDialog from "@/features/offer/components/offer-dialog";
import OfferTable from "@/features/offer/components/offer-table";
import { receivedColumns } from "@/features/offer/hooks/columns";
import { receivedOffersQueryOptions } from "@/features/offer/hooks/query-options";
import { DataTableSkeleton } from "@/features/shared/components/data-table-skeleton";
import { useFilters } from "@/features/shared/hooks/use-filters";
import type { Pageable } from "@/features/shared/types";
import { withDefaultPageable } from "@/lib/utils";

export const Route = createLazyFileRoute("/_authenticated/offers/received")({
	component: RouteComponent,
	pendingComponent: DataTableSkeleton,
});

function RouteComponent() {
	const search = Route.useSearch();

	const routeId = "/_authenticated/offers/received";
	const { setFilters } = useFilters(routeId);

	const pageable = withDefaultPageable(search);

	const { data: page } = useSuspenseQuery(receivedOffersQueryOptions(search));
	return (
		<>
			<OfferTable
				data={page.content}
				columns={receivedColumns}
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
		</>
	);
}
