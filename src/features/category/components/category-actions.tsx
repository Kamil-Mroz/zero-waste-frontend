import { Link } from "@tanstack/react-router";
import { Pencil, Plus, Trash } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import type { CategoryActionsProps } from "../types";

export function CategoryActions({ category, onDelete }: CategoryActionsProps) {
	return (
		<div className="flex gap-1 items-center justify-center">
			<Button size="sm" variant="ghost" asChild>
				<Link
					to="/admin/categories/create/$categoryId"
					params={{ categoryId: category.id }}
				>
					<Plus />
					<span className="sr-only">Add to category</span>
				</Link>
			</Button>
			<Button size="sm" variant="ghost" asChild>
				<Link
					to="/admin/categories/edit/$categoryId"
					params={{
						categoryId: category.id,
					}}
				>
					<Pencil />
					<span className="sr-only">Edit item</span>
				</Link>
			</Button>
			<Button
				size="sm"
				variant="ghost"
				onClick={() => {
					onDelete(category.id);
				}}
				className="cursor-pointer"
			>
				<Trash />
				<span className="sr-only">Delete item</span>
			</Button>
		</div>
	);
}
