import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import ResponsiveDialog from "@/features/shared/components/responsive-dialog";
import { CATEGORY_QUERY_KEYS } from "../constants";
import { categoryMutationOptions } from "../hooks/mutation-options";
import {
	categoriesQueryOptions,
	categoryQueryOptions,
} from "../hooks/query-options";
import { CategoryForm } from "./category-form";

export function CategoryDialog() {
	const routeApi = getRouteApi("/_authenticated/admin/categories/");
	const { useNavigate, useSearch } = routeApi;
	const navigate = useNavigate();
	const { categoryId, modal } = useSearch();
	const queryClient = useQueryClient();
	const router = useRouter();

	const isEdit = modal === "edit";
	const isCreate = modal === "create";
	const isOpen = !!modal;

	const mutation = useMutation({
		...categoryMutationOptions({
			categoryId,
			isEdit,
		}),
		onSuccess: async () => {
			toast.success(
				isEdit
					? "Category updated successfully"
					: "Category created successfully",
			);

			await Promise.all([
				categoryId
					? queryClient.invalidateQueries({
							queryKey: CATEGORY_QUERY_KEYS.category(categoryId),
						})
					: null,
				await queryClient.invalidateQueries({
					queryKey: CATEGORY_QUERY_KEYS.all,
				}),
				await queryClient.invalidateQueries({
					queryKey: CATEGORY_QUERY_KEYS.tree,
				}),
			]);

			await router.invalidate();
			if (isEdit) closeModal();
		},
	});

	const category = useQuery({
		...categoryQueryOptions(categoryId!),
		enabled: isEdit && !!categoryId,
	});
	const categories = useQuery({
		...categoriesQueryOptions(),
		enabled: isEdit,
	});

	const closeModal = () => {
		navigate({
			to: "/admin/categories",
			search: {},
		});
	};

	return (
		<ResponsiveDialog
			isOpen={isOpen}
			setIsOpen={(value) => {
				if (!value) closeModal();
			}}
			title={isEdit ? "Edit Category Form" : "Create Category Form"}
			description={
				isEdit
					? "Update category name or parent category."
					: "Enter category name and optional parent category."
			}
		>
			{isEdit && categoryId && category.data && (
				<CategoryForm
					onSubmit={mutation.mutateAsync}
					showCategorySelect
					categories={categories.data ?? []}
					defaultValues={{
						name: category.data.name,
						categoryId: category.data.parentId ?? "",
					}}
				/>
			)}
			{isCreate && categoryId && (
				<CategoryForm
					onSubmit={mutation.mutateAsync}
					defaultValues={{
						name: "",
						categoryId,
					}}
				/>
			)}

			{isCreate && !categoryId && (
				<CategoryForm
					onSubmit={mutation.mutateAsync}
					defaultValues={{
						name: "",
						categoryId: "",
					}}
				/>
			)}
		</ResponsiveDialog>
	);
}
