import { Link } from "@tanstack/react-router";
import { Pencil, Plus, Trash } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import type { CategoryActionsProps } from "../types";

export function CategoryActions({ category, onDelete }: CategoryActionsProps) {
	return (
		<div className="flex flex-1  gap-1 opacity-0 group-hover:opacity-100 justify-end">
			<Button size="sm" variant="ghost" asChild>
				<Link
					to="/categories/create/$parentId"
					params={{ parentId: category.id }}
				>
					<Plus />
					<span className="sr-only">Add to category</span>
				</Link>
			</Button>
			<Button size="sm" variant="ghost" asChild>
				<Link
					to="/categories/edit/$categoryId"
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
				onClick={(e) => {
					e.stopPropagation();
					onDelete(category.id);
				}}
			>
				<Trash />
				<span className="sr-only">Delete item</span>
			</Button>
		</div>
	);
}
