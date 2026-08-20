import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ItemDetails } from "@/features/item/components/item-details";
import { ItemDetailSkeleton } from "@/features/item/components/item-detail-skeleton";
import { ItemDialog } from "@/features/item/components/item-dialog";
import { itemQueryOptions } from "@/features/item/hooks/query-options";

export const Route = createLazyFileRoute("/marketplace/$itemId")({
	component: RouteComponent,
	pendingComponent: ItemDetailSkeleton,
});

function RouteComponent() {
	const { itemId } = Route.useParams();

	const { data: item } = useSuspenseQuery(itemQueryOptions(itemId));

	return (
		<>
			<ItemDetails item={item} />
			<ItemDialog />
		</>
	);
}
