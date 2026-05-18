import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Box } from "lucide-react";
import { ItemList } from "@/features/item/components/item-list";
import { ItemPagination } from "@/features/item/components/item-pagination";
import { ItemStateFilter } from "@/features/item/components/item-state-filter";
import { ItemToolbar } from "@/features/item/components/item-toolbar";
import { ownItemsQueryOptions } from "@/features/item/hooks/query-options";
import { ownItemSearchSchema } from "@/features/item/schemas/item.schema";
import type { ItemStateType } from "@/features/item/types";
import { EmptyComponent } from "@/features/shared/components/empty-component";
import { Button } from "@/features/shared/components/ui/button";
import { useFilters } from "@/features/shared/hooks/use-filters";
import { withDefaultPageable } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/marketplace/my-items")({
	component: RouteComponent,

	validateSearch: ownItemSearchSchema,
	loaderDeps: ({ search }) => ({ search }),

	staticData: {
		getTitle: () => "My items",
	},
	loader: async ({ context, deps: { search } }) => {
		const data = await context.queryClient.ensureQueryData(
			ownItemsQueryOptions(search),
		);
		if (search.page && search.page > data.totalPages) {
			throw redirect({
				to: "/marketplace/my-items",
				search: {
					...search,
					page: data.totalPages - 1,
				},
				replace: true,
			});
		}
	},
});

function RouteComponent() {
	const routeId = "/_authenticated/marketplace/my-items";
	const { clearFilters, setFilters } = useFilters(routeId);
	const search = Route.useSearch();
	const pageable = withDefaultPageable(search);
	const { data } = useSuspenseQuery(ownItemsQueryOptions(search));
	const onChange = (states: ItemStateType[]) => {
		if (states.length === 0) clearFilters(["states"]);
		else setFilters({ states });
	};

	return (
		<div className="space-y-2">
			<ItemToolbar routeId={routeId}>
				<ItemStateFilter states={search.states ?? []} onChange={onChange} />
			</ItemToolbar>

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
				<ItemList items={data.content} />
			)}
			<ItemPagination
				link={"/marketplace/my-items"}
				totalPages={0}
				pageable={pageable}
			/>
		</div>
	);
}
