import { useQueryClient, useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { CategoryForm } from "@/features/category/components/category-form";
import { CATEGORY_QUERY_KEYS } from "@/features/category/constants";
import {
	categoriesQueryOptions,
	categoryQueryOptions,
} from "@/features/category/hooks/query-options";
import type { CategoryFormType } from "@/features/category/types";
import { categoryParamSchema } from "@/features/shared/schemas/uuid.schema";
import { api } from "@/lib/axios";

export const Route = createFileRoute(
	"/_authenticated/admin/categories/edit/$categoryId",
)({
	component: RouteComponent,
	staticData: {
		getTitle: () => "Edit",
	},
	loader: async ({ context, params }) => {
		await Promise.all([
			context.queryClient.ensureQueryData(
				categoryQueryOptions(params.categoryId),
			),
			context.queryClient.ensureQueryData(categoriesQueryOptions()),
		])
	},
	params: {
		parse: (params) => {
			const result = categoryParamSchema.safeParse(params);
			if (!result.success) {
				throw notFound();
			}
			return {
				categoryId: result.data.categoryId,
			}
		},
	},
});

function RouteComponent() {
	const { categoryId } = Route.useParams();
	const router = useRouter();
	const queryClient = useQueryClient();

	const [{ data: categories }, { data: category }] = useSuspenseQueries({
		queries: [categoriesQueryOptions(), categoryQueryOptions(categoryId)],
	});

	const onSubmit = async (value: CategoryFormType) => {
		await api.put(`/api/v1/categories/${categoryId}`, value);
		toast.success("Category updated successfully");
		await queryClient.invalidateQueries({
			queryKey: CATEGORY_QUERY_KEYS.category(categoryId),
		})
		await queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all });
		await queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.tree });
		await router.invalidate();
	}

	return (
		<CategoryForm
			onSubmit={onSubmit}
			categories={categories}
			showCategorySelect
			defaultValues={{
				name: category.name,
				categoryId: category.parentId,
			}}
		/>
	)
}
