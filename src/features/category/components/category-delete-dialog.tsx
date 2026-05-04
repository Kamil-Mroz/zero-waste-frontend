import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/features/shared/components/ui/button";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { CATEGORY_QUERY_KEYS } from "../constants";
import { deleteCategoryMutationOptions } from "../hooks/mutation-options";
import { categoryQueryOptions } from "../hooks/query-options";
import type { CategoryDeleteDialogProps } from "../types";

export function CategoryDeleteDialog({
	id,
	onDone,
}: CategoryDeleteDialogProps) {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { data: category } = useSuspenseQuery(categoryQueryOptions(id));

	const mutation = useMutation({
		...deleteCategoryMutationOptions(),
		onSuccess: async (_, id) => {
			toast.success("category deleted successfully");

			onDone();
			await Promise.all([
				queryClient.removeQueries({
					queryKey: CATEGORY_QUERY_KEYS.byId(id),
				}),
				queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all }),
				queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.tree }),
			]);
			await router.invalidate();
		},
	});
	return (
		<div className="space-y-4">
			<p>Category to delete: {category.name}</p>
			<div className="grid grid-cols-2 gap-2">
				<Button
					variant="outline"
					onClick={() => {
						onDone();
					}}
				>
					Cancel
				</Button>
				<Button
					variant="destructive"
					onClick={() => mutation.mutate(category.id)}
					disabled={mutation.isPending}
				>
					{mutation.isPending ? <Spinner /> : "Delete Category"}
				</Button>
			</div>
		</div>
	);
}
