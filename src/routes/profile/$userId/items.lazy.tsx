import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Box } from "lucide-react";
import { ItemList } from "@/features/item/components/item-list";
import { ItemsListSkeleton } from "@/features/item/components/item-list-skeleton";
import { userItemsQueryOptions } from "@/features/item/hooks/query-options";
import { EmptyComponent } from "@/features/shared/components/empty-component";
import GoBackButton from "@/features/shared/components/go-back-button";
import { Button } from "@/features/shared/components/ui/button";

export const Route = createLazyFileRoute("/profile/$userId/items")({
	pendingComponent: ItemsListSkeleton,
	component: RouteComponent,
});

function RouteComponent() {
	const { userId } = Route.useParams();
	const { data: items } = useSuspenseQuery(userItemsQueryOptions(userId));

	return (
		<div className="space-y-2">
			<GoBackButton />
			{items.length > 0 ? (
				<ItemList items={items} />
			) : (
				<EmptyComponent
					title="No items"
					description="No items listed yet."
					icon={Box}
				>
					<Button asChild>
						<Link to="/profile/$userId" params={{ userId }}>
							Go back to user profile
						</Link>
					</Button>
				</EmptyComponent>
			)}
		</div>
	);
}
