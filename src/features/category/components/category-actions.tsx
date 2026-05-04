import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/features/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/features/shared/components/ui/dropdown-menu";
import { CATEGORY_QUERY_KEYS } from "../constants";
import { deleteCategoryMutationOptions } from "../hooks/mutation-options";
import type { CategoryActionsProps } from "../types";

export function CategoryActions({ category }: CategoryActionsProps) {
	// const router = useRouter();
	// const queryClient = useQueryClient();

	// const deleteMutation = useMutation({
	// 	...categoryDeleteMutationOptions(),
	// 	onSuccess: async (_, id) => {
	// 		toast.success("category deleted successfully");

	// 		await Promise.all([
	// 			queryClient.removeQueries({
	// 				queryKey: CATEGORY_QUERY_KEYS.byId(id),
	// 			}),
	// 			queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all }),
	// 			queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.tree }),
	// 		]);
	// 		await router.invalidate();
	// 	},
	// });

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					<MoreHorizontal />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild>
					<Link
						to="/admin/categories"
						search={{ modal: "create", categoryId: category.id }}
					>
						Add
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link
						to="/admin/categories"
						search={{
							modal: "edit",
							categoryId: category.id,
						}}
					>
						Edit
					</Link>
				</DropdownMenuItem>
				{category.children.length === 0 ? (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							variant="destructive"
							// onClick={() => deleteMutation.mutate(category.id)}
							// disabled={deleteMutation.isPending}
							asChild
						>
							<Link
								to="/admin/categories"
								search={{
									modal: "delete",
									categoryId: category.id,
								}}
							>
								Delete
							</Link>
						</DropdownMenuItem>
					</>
				) : null}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
