import { createFileRoute, notFound } from "@tanstack/react-router";
import { z } from "zod/v4";
import { itemQueryOptions } from "@/features/item/hooks/query-options";
import { idParamSchema } from "@/features/shared/schemas/uuid.schema";

const itemSearchSchema = z.object({
	modal: z
		.enum(["hide", "delete", "offer", "publish"])
		.optional()
		.catch("delete"),
});

export const Route = createFileRoute("/marketplace/$itemId")({
	head: () => ({
		meta: [
			{
				title: "Item",
			},
		],
	}),
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
