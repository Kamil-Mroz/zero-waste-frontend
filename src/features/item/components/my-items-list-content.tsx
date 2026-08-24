import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Box } from "lucide-react";
import { CustomPagination } from "@/features/shared/components/custom-pagination";
import { EmptyComponent } from "@/features/shared/components/empty-component";
import { Button } from "@/features/shared/components/ui/button";
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
			{data.content.length === 0 ? (
				<EmptyComponent
					title="No items"
					description="No items listed yet."
					icon={Box}
				>
					<Button asChild>
						<Link to="/marketplace/create">Add item</Link>
					</Button>
				</EmptyComponent>
			) : (
				<>
					<ItemList items={data.content} />
					<CustomPagination totalPages={data.totalPages} pageable={pageable} />
				</>
			)}
		</>
	);
}
