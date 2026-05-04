import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { categoriesQueryOptions } from "@/features/category/hooks/query-options";
import { CreateItemForm } from "@/features/item/components/create-item-form";
import { ITEM_QUERY_KEYS } from "@/features/item/constants";
import { createItemMutationOptions } from "@/features/item/hooks/mutation-options";

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
			toast.success("Item created successfully");

			await navigate({
				to: "/marketplace/$itemId",
				params: { itemId: data.id },
			});
			await queryClient.invalidateQueries({ queryKey: ITEM_QUERY_KEYS.own() });
		},
	});

	return (
		<CreateItemForm categories={categories} onSubmit={mutation.mutateAsync} />
	);
}
