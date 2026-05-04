import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { CATEGORY_QUERY_KEYS } from "../constants";
import { createCategoryMutationOptions } from "../hooks/mutation-options";
import type { CategoryCreateDialogProps } from "../types";
import { CategoryForm } from "./category-form";

export function CategoryCreateDialog({ id }: CategoryCreateDialogProps) {
	const queryClient = useQueryClient();
	const router = useRouter();

	const mutation = useMutation({
		...createCategoryMutationOptions(),
		onSuccess: async () => {
			toast.success("Category created successfully");

			await router.invalidate();

			await Promise.all([
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
			defaultValues={{
				name: "",
				categoryId: id ?? "",
			}}
		/>
	);
}
