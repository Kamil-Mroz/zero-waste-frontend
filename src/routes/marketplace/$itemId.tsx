import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { z } from "zod/v4";
import { Item } from "@/features/item/components/item";
import { ItemDialog } from "@/features/item/components/item-dialog";
import { itemQueryOptions } from "@/features/item/hooks/query-options";
import { itemParamSchema } from "@/features/shared/schemas/uuid.schema";

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
	params: {
		parse: (params) => {
			const result = itemParamSchema.safeParse(params);
			if (!result.success) {
				throw notFound();
			}
			return {
				itemId: result.data.itemId,
			};
		},
	},
	loader: async ({ context, params }) => {
		try {
			await context.queryClient.ensureQueryData(
				itemQueryOptions(params.itemId ),
			);
		} catch {
			throw notFound();
		}
	},
});

function RouteComponent() {
	const { itemId } = Route.useParams();

	const { data: item } = useSuspenseQuery(itemQueryOptions(itemId, ));

	return (
		<>
			<Item item={item} />
			<ItemDialog />
		</>
	);
}
