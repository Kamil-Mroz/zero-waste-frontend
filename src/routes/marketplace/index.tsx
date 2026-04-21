import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { ItemList } from "@/features/item/components/item-list";
import { itemsQueryOptions } from "@/features/item/hooks/query-options";
import { EmptyComponent } from "@/features/shared/components/empty-component";

export const Route = createFileRoute("/marketplace/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(itemsQueryOptions());
	},
});

function RouteComponent() {
	const { data: items } = useSuspenseQuery(itemsQueryOptions());

	if (items.length === 0) {
		return (
			<EmptyComponent
				title="No items"
				description="No items listed yet."
				icon={Package}
			/>
		);
	}

	return <ItemList items={items} />;
}
