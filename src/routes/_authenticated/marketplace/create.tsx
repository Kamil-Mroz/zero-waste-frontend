import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { categoriesQueryOptions } from "@/features/category/hooks/query-options";
import { ItemForm } from "@/features/item/components/item-form";
import { ITEM_QUERY_KEYS } from "@/features/item/constants";
import type { ItemFormRequest, ItemType } from "@/features/item/types";
import { api } from "@/lib/axios";

export const Route = createFileRoute("/_authenticated/marketplace/create")({
	component: RouteComponent,

	staticData: {
		getTitle: () => "Create item",
	},
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(categoriesQueryOptions());
	},
});

function RouteComponent() {
	const { data: categories } = useSuspenseQuery(categoriesQueryOptions());
	const router = useRouter();
	const queryClient = useQueryClient();
	const navigate = Route.useNavigate();

	const onSubmit = async (values: ItemFormRequest) => {
		const res = await api.post<ItemType>(`/api/v1/items`, values);
		toast.success("Item created successfully");
		await queryClient.invalidateQueries({ queryKey: ITEM_QUERY_KEYS.own() });
		await router.invalidate();
		await navigate({
			to: "/marketplace/$itemId",
			params: { itemId: res.data.id },
		});
	};

	return <ItemForm categories={categories} onSubmit={onSubmit} />;
}
