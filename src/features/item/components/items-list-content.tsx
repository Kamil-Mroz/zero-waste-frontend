import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { CustomPagination } from "@/features/shared/components/custom-pagination";
import { EmptyComponent } from "@/features/shared/components/empty-component";
import { useFilters } from "@/features/shared/hooks/use-filters";
import {
	cleanEmptyParams,
	getValidPage,
	withDefaultPageable,
} from "@/lib/utils";
import { itemsQueryOptions } from "../hooks/query-options";
import { ItemList } from "./item-list";
import { ItemsListSkeleton } from "./item-list-skeleton";

export function ItemsListContent() {
	const routeId = "/marketplace/";
	const routeApi = getRouteApi(routeId);
	const search = routeApi.useSearch();
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

		const correctPage = getValidPage(search.page, data.totalPages);
		if (correctPage) {
			setFilters({ page: correctPage });
		}
	}, [data, search.page, setFilters]);

	return (
		<>
			{auth.isLoading || isPending ? (
				<ItemsListSkeleton />
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

			<CustomPagination
				totalPages={data?.totalPages ?? 1}
				pageable={pageable}
			/>
		</>
	);
}
