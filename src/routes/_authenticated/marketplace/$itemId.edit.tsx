import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { categoriesQueryOptions } from "@/features/category/hooks/query-options";
import { itemQueryOptions } from "@/features/item/hooks/query-options";
import type { ItemWithOwnerType } from "@/features/item/types";
import { idParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute(
	"/_authenticated/marketplace/$itemId/edit",
)({
	staticData: {
		getTitle: () => "Edit item",
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
		let item: ItemWithOwnerType;
		try {
			const [data, _] = await Promise.all([
				context.queryClient.ensureQueryData(itemQueryOptions(params.itemId)),
				context.queryClient.ensureQueryData(categoriesQueryOptions()),
			]);
			item = data;
		} catch {
			throw notFound();
		}
		if (item.owner.id !== context.auth.user?.id) {
			throw redirect({ to: "/marketplace" });
		}
	},
});
