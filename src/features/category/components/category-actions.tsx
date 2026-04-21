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
import { categoryDeleteMutationOptions } from "../hooks/mutation-options";
import type { CategoryActionsProps } from "../types";

export function CategoryActions({ category }: CategoryActionsProps) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		...categoryDeleteMutationOptions(),
		onSuccess: async (_, id) => {
			toast.success("category deleted successfully");

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ["category", id],
				}),
				queryClient.invalidateQueries({ queryKey: ["categories"] }),
				queryClient.invalidateQueries({ queryKey: ["categoryTree"] }),
			]);
			await router.invalidate();
		},
	});

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

				<DropdownMenuSeparator />
				<DropdownMenuItem
					variant="destructive"
					onClick={() => deleteMutation.mutate(category.id)}
				>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
