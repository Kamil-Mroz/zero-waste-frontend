import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Box } from "lucide-react";
import { ItemLIst } from "@/features/item/components/item-list";
import { ownItemsQueryOptions } from "@/features/item/hooks/query-options";
import { EmptyComponent } from "@/features/shared/components/empty-component";

export const Route = createFileRoute("/_authenticated/marketplace/my-items")({
	component: RouteComponent,

	staticData: {
		getTitle: () => "My items",
	},
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(ownItemsQueryOptions());
	},
});

function RouteComponent() {
	const { data: items } = useSuspenseQuery(ownItemsQueryOptions());

	if (items.length === 0) {
		return (
			<EmptyComponent
				title="No items"
				description="No items listed yet."
				icon={Box}
				linkTo="/marketplace/create"
				linkLabel="Add Item"
			/>
		);
	}

	return <ItemLIst items={items} />;
}
