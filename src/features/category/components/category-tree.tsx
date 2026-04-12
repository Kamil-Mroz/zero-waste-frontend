import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { api } from "@/lib/axios";
import { handleApiError } from "@/lib/utils";
import type { CategoryTreeProps } from "../types";
import { CategoryTreeItem } from "./category-tree-item";

export function CategoryTree({ items }: CategoryTreeProps) {
	const { token } = useAuth();
	const router = useRouter();
	const queryClient = useQueryClient();

	const onDelete = async (id: string) => {
		try {
			await api.delete(`/api/v1/categories/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			toast.success("Category deleted successfully");
			await queryClient.invalidateQueries({
				queryKey: ["category", id],
			});
			await queryClient.invalidateQueries({ queryKey: ["categories"] });
			await queryClient.invalidateQueries({ queryKey: ["categoryTree"] });
			await router.invalidate();
		} catch (error) {
			const message = handleApiError(error);
			if (message) toast.error(message);
		}
	};

	return (
		<div className="flex flex-col gap-1">
			{items.map((category) => (
				<CategoryTreeItem
					key={category.id}
					onDelete={onDelete}
					item={category}
				/>
			))}
		</div>
	);
}
