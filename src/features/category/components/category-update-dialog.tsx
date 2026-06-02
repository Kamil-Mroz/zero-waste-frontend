import {
	useMutation,
	useQueryClient,
	useSuspenseQueries,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { appToast } from "@/features/shared/components/toast";
import { CATEGORY_QUERY_KEYS } from "../constants";
import { updateCategoryMutationOptions } from "../hooks/mutation-options";
import {
	categoriesQueryOptions,
	categoryQueryOptions,
} from "../hooks/query-options";
import type { CategoryUpdateDialogProps } from "../types";
import { CategoryForm } from "./category-form";

export function CategoryUpdateDialog({
	id,
	onDone,
}: CategoryUpdateDialogProps) {
	const queryClient = useQueryClient();

	const [{ data: category }, { data: categories }] = useSuspenseQueries({
		queries: [categoryQueryOptions(id), categoriesQueryOptions()],
	});

	const mutation = useMutation({
		...updateCategoryMutationOptions(id),
		onSuccess: async () => {
			appToast.success({
				title: "Category update",
				description: "Category updated successfully",
			});
			onDone();

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: CATEGORY_QUERY_KEYS.byId(id),
				}),
				queryClient.invalidateQueries({
					queryKey: CATEGORY_QUERY_KEYS.all,
				}),
				queryClient.invalidateQueries({
					queryKey: CATEGORY_QUERY_KEYS.tree,
				}),
			]);
		},
	});

	return (
		<CategoryForm
			onSubmit={mutation.mutateAsync}
			showCategorySelect
			categories={categories ?? []}
			defaultValues={{
				name: category.name,
				categoryId: category.parentId ?? "",
			}}
		/>
	);
}
