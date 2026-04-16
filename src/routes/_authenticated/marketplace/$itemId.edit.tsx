import { useQueryClient, useSuspenseQueries } from "@tanstack/react-query";
import {
	createFileRoute,
	notFound,
	redirect,
	useRouter,
} from "@tanstack/react-router";
import { toast } from "sonner";
import { categoriesQueryOptions } from "@/features/category/hooks/query-options";
import { ItemForm } from "@/features/item/components/item-form";
import { ITEM_QUERY_KEYS } from "@/features/item/constants";
import { itemQueryOptions } from "@/features/item/hooks/query-options";
import type { ItemFormRequest, ItemType } from "@/features/item/types";
import { itemParamSchema } from "@/features/shared/schemas/uuid.schema";
import { api } from "@/lib/axios";

export const Route = createFileRoute(
	"/_authenticated/marketplace/$itemId/edit",
)({
	component: RouteComponent,
	staticData: {
		getTitle: () => "Edit item",
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
		const [item, _] = await Promise.all([
			context.queryClient.ensureQueryData(itemQueryOptions(params.itemId)),
			context.queryClient.ensureQueryData(categoriesQueryOptions()),
		]);
		if (item.owner.id !== context.auth.user?.id) {
			throw redirect({ to: "/marketplace" });
		}
	},
});

function RouteComponent() {
	const { itemId } = Route.useParams();
	const [{ data: item }, { data: categories }] = useSuspenseQueries({
		queries: [itemQueryOptions(itemId), categoriesQueryOptions()],
	});
	const queryClient = useQueryClient();
	const navigate = Route.useNavigate();
	const router = useRouter();

	const onSubmit = async (values: ItemFormRequest) => {
		const res = await api.put<ItemType>(`/api/v1/items/${itemId}`, values);
		toast.success("Item updated successfully");
		await queryClient.invalidateQueries({ queryKey: ITEM_QUERY_KEYS.own() });
		await queryClient.invalidateQueries({
			queryKey: ITEM_QUERY_KEYS.byId(itemId),
		});

		await router.invalidate();
		await navigate({
			to: "/marketplace/$itemId",
			params: { itemId: res.data.id },
		});
	};
	return (
		<ItemForm
			onSubmit={onSubmit}
			categories={categories}
			defaultValues={{ ...item, categoryId: item.category.id }}
		/>
	);
}
