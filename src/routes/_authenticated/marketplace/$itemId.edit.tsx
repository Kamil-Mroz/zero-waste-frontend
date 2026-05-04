import {
	useMutation,
	useQueryClient,
	useSuspenseQueries,
} from "@tanstack/react-query";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import { categoriesQueryOptions } from "@/features/category/hooks/query-options";
import { EditItemForm } from "@/features/item/components/edit-item-form";
import { ITEM_QUERY_KEYS } from "@/features/item/constants";
import { updateItemMutationOptions } from "@/features/item/hooks/mutation-options";
import { itemQueryOptions } from "@/features/item/hooks/query-options";
import { itemParamSchema } from "@/features/shared/schemas/uuid.schema";

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

	const mutation = useMutation({
		...updateItemMutationOptions(itemId),
		onSuccess: async (data) => {
			toast.success("Item updated successfully");
			await navigate({
				to: "/marketplace/$itemId",
				params: { itemId: data.id },
			});
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ITEM_QUERY_KEYS.own() }),
				queryClient.invalidateQueries({
					queryKey: ITEM_QUERY_KEYS.byId(itemId),
				}),
			]);
		},
	});

	return (
		<EditItemForm
			item={item}
			onSubmit={mutation.mutateAsync}
			categories={categories}
		/>
	);
}
