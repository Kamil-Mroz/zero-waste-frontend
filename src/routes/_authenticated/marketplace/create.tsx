import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { categoriesQueryOptions } from "@/features/category/hooks/query-options";
import { CreateItemForm } from "@/features/item/components/create-item-form";
import { ITEM_QUERY_KEYS } from "@/features/item/constants";
import { createItemMutationOptions } from "@/features/item/hooks/mutation-options";
import { PROFILE_QUERY_KEYS } from "@/features/profile/constants";
import { appToast } from "@/features/shared/components/toast";

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
	const queryClient = useQueryClient();
	const navigate = Route.useNavigate();
	const mutation = useMutation({
		...createItemMutationOptions(),
		onSuccess: async (data) => {
			appToast.success({
				title: "Item form",
				description: "Item created successfully",
			});

			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ITEM_QUERY_KEYS.own() }),
				queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.own() }),
			]);

			await navigate({
				to: "/marketplace/$itemId",
				params: { itemId: data.id },
			});
		},
	});

	return (
		<CreateItemForm categories={categories} onSubmit={mutation.mutateAsync} />
	);
}
