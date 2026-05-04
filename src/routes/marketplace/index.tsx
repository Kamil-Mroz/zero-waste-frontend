import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ItemList } from "@/features/item/components/item-list";
import { itemsQueryOptions } from "@/features/item/hooks/query-options";
import { EmptyComponent } from "@/features/shared/components/empty-component";
import { PendingComponent } from "@/features/shared/components/pending";

export const Route = createFileRoute("/marketplace/")({
	component: RouteComponent,
});

function RouteComponent() {
	const auth = useAuth();
	const { data: items, isLoading } = useQuery({
		...itemsQueryOptions(),
		enabled: !auth.isLoading,
	});

	if (auth.isLoading || isLoading) {
		return <PendingComponent />;
	}

	if (!items || items.length === 0) {
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
