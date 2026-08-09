import {
	useMutation,
	useQueryClient,
	useSuspenseQueries,
} from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { categoriesQueryOptions } from "@/features/category/hooks/query-options";
import { EditItemForm } from "@/features/item/components/edit-item-form";
import { ITEM_QUERY_KEYS } from "@/features/item/constants";
import { updateItemMutationOptions } from "@/features/item/hooks/mutation-options";
import { itemQueryOptions } from "@/features/item/hooks/query-options";
import { PROFILE_QUERY_KEYS } from "@/features/profile/constants";
import { appToast } from "@/features/shared/components/toast";

export const Route = createLazyFileRoute(
	"/_authenticated/marketplace/$itemId/edit",
)({
	component: RouteComponent,
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
			appToast.success({
				title: "Item form",
				description: "Item updated successfully",
			});

			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ITEM_QUERY_KEYS.own() }),
				queryClient.invalidateQueries({
					queryKey: ITEM_QUERY_KEYS.byId(itemId),
				}),
				queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.own() }),
			]);

			await navigate({
				to: "/marketplace/$itemId",
				params: { itemId: data.id },
			});
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
