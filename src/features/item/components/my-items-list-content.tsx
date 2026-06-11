import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { CustomPagination } from "@/features/shared/components/custom-pagination";
import { withDefaultPageable } from "@/lib/utils";
import { ownItemsQueryOptions } from "../hooks/query-options";
import { ItemList } from "./item-list";

export function MyItemsListContent() {
	const routeApi = getRouteApi("/_authenticated/marketplace/my-items");
	const search = routeApi.useSearch();
	const pageable = withDefaultPageable(search);
	const { data } = useSuspenseQuery(ownItemsQueryOptions(search));

	return (
		<>
			<ItemList items={data.content} isOwnItems />
			<CustomPagination totalPages={data.totalPages} pageable={pageable} />
		</>
	);
}
