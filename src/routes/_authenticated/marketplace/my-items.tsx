import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { ItemsListSkeleton } from "@/features/item/components/item-list-skeleton";
import { ItemStateFilter } from "@/features/item/components/item-state-filter";
import { ItemToolbar } from "@/features/item/components/item-toolbar";
import { MyItemsListContent } from "@/features/item/components/my-items-list-content";

import { ownItemSearchSchema } from "@/features/item/schemas/item.schema";
import type { ItemStateType } from "@/features/item/types";
import { useFilters } from "@/features/shared/hooks/use-filters";

export const Route = createFileRoute("/_authenticated/marketplace/my-items")({
	component: RouteComponent,

	validateSearch: ownItemSearchSchema,
	loaderDeps: ({ search }) => {
		const { states, category, page, size, text } = search;
		return { states, category, page, size, text };
	},

	staticData: {
		getTitle: () => "My items",
	},
});

function RouteComponent() {
	const routeId = "/_authenticated/marketplace/my-items";
	const { clearFilters, setFilters } = useFilters(routeId);
	const search = Route.useSearch();

	const onChange = (states: ItemStateType[]) => {
		if (states.length === 0) clearFilters(["states"]);
		else setFilters({ states });
	};

	return (
		<div className="space-y-2">
			<ItemToolbar routeId={routeId}>
				<ItemStateFilter states={search.states ?? []} onChange={onChange} />
			</ItemToolbar>

			<Suspense fallback={<ItemsListSkeleton />}>
				<MyItemsListContent />
			</Suspense>
		</div>
	);
}
