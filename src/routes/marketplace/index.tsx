import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ItemList } from "@/features/item/components/item-list";
import { ItemPagination } from "@/features/item/components/item-pagination";
import { ItemToolbar } from "@/features/item/components/item-toolbar";
import { itemsQueryOptions } from "@/features/item/hooks/query-options";
import { baseItemSearchSchema } from "@/features/item/schemas/item.schema";
import { EmptyComponent } from "@/features/shared/components/empty-component";
import { PendingComponent } from "@/features/shared/components/pending";
import { useFilters } from "@/features/shared/hooks/use-filters";
import { cleanEmptyParams, withDefaultPageable } from "@/lib/utils";

export const Route = createFileRoute("/marketplace/")({
	validateSearch: baseItemSearchSchema,
	component: RouteComponent,
});

function RouteComponent() {
	const routeId = "/marketplace/";
	const search = Route.useSearch();
	const auth = useAuth();
	const { setFilters } = useFilters(routeId);
	const pageable = withDefaultPageable(search);

	const query = cleanEmptyParams(search);

	const { data, isPending } = useQuery({
		...itemsQueryOptions(query),
		enabled: !auth.isLoading,
	});
	useEffect(() => {
		if (!data) return;

		const page = search.page ?? 0;
		const total = data.totalPages;

		if (page >= total && total > 0) {
			setFilters({ page: total - 1 });
		}
	}, [data, search.page, setFilters]);

	return (
		<div className="space-y-2 ">
			<ItemToolbar routeId={routeId} />
			{auth.isLoading || isPending ? (
				<PendingComponent />
			) : !data?.content || data.content.length === 0 ? (
				<EmptyComponent
					title="No items"
					description="No items listed yet."
					icon={Package}
				/>
			) : null}
			{data?.content && data.content.length > 0 && (
				<ItemList items={data.content} />
			)}

			<ItemPagination
				totalPages={data?.totalPages ?? 1}
				link={routeId}
				pageable={pageable}
			/>
		</div>
	);
}
