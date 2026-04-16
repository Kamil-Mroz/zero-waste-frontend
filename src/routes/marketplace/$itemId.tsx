import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Item } from "@/features/item/components/item";
import { itemQueryOptions } from "@/features/item/hooks/query-options";
import { itemParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute("/marketplace/$itemId")({
	component: RouteComponent,
	staticData: {
		getTitle: () => "Item",
	},
	params: {
		parse: (params) => {
			const result = itemParamSchema.safeParse(params);
			if (!result.success) {
        throw notFound()
			}
			return {
				itemId: result.data.itemId,
			};
		},
	},
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(itemQueryOptions(params.itemId));
	},
});

function RouteComponent() {
	const { itemId } = Route.useParams();
	const { data: item } = useSuspenseQuery(itemQueryOptions(itemId));

	return <Item item={item} />;
}
