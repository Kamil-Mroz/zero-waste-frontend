import { createFileRoute } from "@tanstack/react-router";
import { ItemToolbar } from "@/features/item/components/item-toolbar";

import { ItemsListContent } from "@/features/item/components/items-list-content";
import { baseItemSearchSchema } from "@/features/item/schemas/item.schema";

export const Route = createFileRoute("/marketplace/")({
	validateSearch: baseItemSearchSchema,
	component: RouteComponent,
});

function RouteComponent() {
	const routeId = "/marketplace/";

	return (
		<div className="space-y-2 ">
			<ItemToolbar routeId={routeId} />
			<ItemsListContent />
		</div>
	);
}
