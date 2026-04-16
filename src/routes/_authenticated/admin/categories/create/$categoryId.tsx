import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { CategoryForm } from "@/features/category/components/category-form";
import type { CategoryFormType } from "@/features/category/types";
import { categoryParamSchema } from "@/features/shared/schemas/uuid.schema";
import { api } from "@/lib/axios";

export const Route = createFileRoute(
	"/_authenticated/admin/categories/create/$categoryId",
)({
	component: RouteComponent,
	staticData: {
		getTitle: () => "Create category",
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
	const queryClient = useQueryClient();
	const router = useRouter();

	const onSubmit = async (value: CategoryFormType) => {
		await api.post(`/api/v1/categories`, value);
		toast.success("Category created successfully");
		await queryClient.invalidateQueries({ queryKey: ["categoryTree"] });
		await router.invalidate();
	}

	return (
		<CategoryForm
			defaultValues={{ name: "", categoryId: categoryId }}
			onSubmit={onSubmit}
		/>
	)
}
