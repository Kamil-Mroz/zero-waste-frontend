import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { CategoryForm } from "@/features/category/components/category-form";
import type { CategoryFormType } from "@/features/category/types";
import { api } from "@/lib/axios";

export const Route = createFileRoute(
	"/_authenticated/_admin/categories/create/",
)({
	component: RouteComponent,
	staticData: {
		getTitle: () => "Create category",
	},
});

function RouteComponent() {
	const { token } = useAuth();
	const queryClient = useQueryClient();
	const router = useRouter();

	const onSubmit = async (value: CategoryFormType) => {
		await api.post(
			"/api/v1/categories",
			{ name: value.name, categoryId: null },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		toast.success("Category created successfully");

		await queryClient.invalidateQueries({ queryKey: ["categoryTree"] });
    await router.invalidate()
	};

	return <CategoryForm onSubmit={onSubmit} />;
}
