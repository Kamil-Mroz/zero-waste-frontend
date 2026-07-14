import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { z } from "zod/v4";
import { Item } from "@/features/item/components/item";
import { ItemDetailSkeleton } from "@/features/item/components/item-detail-skeleton";
import { ItemDialog } from "@/features/item/components/item-dialog";
import { itemQueryOptions } from "@/features/item/hooks/query-options";
import { idParamSchema } from "@/features/shared/schemas/uuid.schema";

const itemSearchSchema = z.object({
	modal: z
		.enum(["hide", "delete", "offer", "publish"])
		.optional()
		.catch("delete"),
});

export const Route = createFileRoute("/marketplace/$itemId")({
	component: RouteComponent,
	staticData: {
		getTitle: () => "Item",
	},
	validateSearch: itemSearchSchema,
	loaderDeps: ({ search }) => {
		const { modal } = search;
		return { modal };
	},
	pendingComponent: ItemDetailSkeleton,
	params: {
		parse: (params) => {
			const result = idParamSchema.safeParse({ id: params.itemId });
			if (!result.success) {
				throw notFound();
			}
			return {
				itemId: result.data.id,
			};
		},
	},
	loader: async ({ context, params }) => {
		try {
			await context.queryClient.ensureQueryData(
				itemQueryOptions(params.itemId),
			);
		} catch {
			throw notFound();
		}
	},
});

function RouteComponent() {
	const { itemId } = Route.useParams();

	const { data: item } = useSuspenseQuery(itemQueryOptions(itemId));

	return (
		<>
			<Item item={item} />
			<ItemDialog />
		</>
	);
}
